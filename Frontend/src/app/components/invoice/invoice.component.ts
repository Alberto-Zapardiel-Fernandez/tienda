import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceService } from '../../services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  searchForm: FormGroup;
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  cartItems: any[] = [];
  totalAmount: number = 0;
  clients: ClientInterface[] = [];
  terminoBusqueda: string = '';
  clientesFiltrados: ClientInterface[] = [];
  clienteSeleccionado: ClientInterface | undefined;
  mostrarCliente: boolean = true;
  formattedTotal: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public successDialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
      }
    }
    this.clientService.getClients('clients').subscribe((clients) => {
      this.clients = clients || [];
    });
    this.productService.getProducts('products').subscribe((products) => {
      this.products = products.filter((product) => product.stock > 0);
    });
    this.calculateTotal();
  }
  borrarCliente() {
    this.clienteSeleccionado = undefined;
    this.mostrarCliente = true;
  }
  seleccionaCliente(cliente: ClientInterface) {
    this.clienteSeleccionado = cliente;
    this.clientesFiltrados = [];
    this.mostrarCliente = false;
    console.log(cliente);
  }
  goToClients() {
    this.router.navigate(['/client']);
  }
  buscarCliente() {
    this.clientesFiltrados = this.clients.filter(
      (cliente) =>
        cliente.name
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        cliente.dni.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  guardarFactura() {
    const confirmacion = confirm(
      'Estás seguro de que quieres guardar la factura?'
    );
    if (!confirmacion) {
      return;
    }
    if (!this.clienteSeleccionado) {
      // Mostrar un diálogo de confirmación
      const confirmar = confirm(
        '¿Estás seguro de guardar la factura sin cliente seleccionado?'
      );
      if (!confirmar) {
        return;
      }
    }
    const productosConCantidad = this.cartItems.map((cartItem) => ({
      ...cartItem.product,
      quantity: cartItem.quantity,
    }));
    console.log(productosConCantidad);
    this.invoiceService
      .generateInvoice(
        'save_invoice',
        this.clienteSeleccionado != null ? this.clienteSeleccionado.dni : '',
        this.totalAmount,
        productosConCantidad
      )
      .subscribe({
        next: () => {
          this.successDialog.open(SuccessModalComponent, {
            width: '250px',
            data: {
              message: 'Agregado correctamente',
            },
          });
          this.cleanProductList();
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }
  generarPDF() {
    const element = document.getElementById('facturacion');

    if (element) {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4', // Establece el tamaño de la página a A4
        });
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('factura.pdf');
      });
    } else {
      console.error('Elemento no encontrado');
    }
  }
  cleanProductList() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
  calculateTotal() {
    const subtotal = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const vatRate = 0.21; // 21% VAT rate
    const vatAmount = subtotal * vatRate;

    this.totalAmount = subtotal + vatAmount;
    this.formattedTotal = this.totalAmount.toFixed(2);
  }
  saveCartItems() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
  onSearch() {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
  }
  addProductToCart(product: any) {
    // Buscar si el producto ya está en el carrito
    const existingProduct = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      // Si ya existe, incrementar la cantidad
      existingProduct.quantity++;
    } else {
      // Si no existe, agregarlo al carrito con cantidad 1
      this.cartItems.push({
        product,
        quantity: 1,
      });
    }
    this.saveCartItems();
    this.calculateTotal();
    this.resetSearch();
  }
  resetSearch() {
    this.searchForm.get('searchTerm')?.setValue('');
    this.filteredProducts = [];
    this.changeDetectorRef.detectChanges();
  }

  incrementQuantity(cartItem: any, product: ProductInterface): void {
    console.log(product.stock);
    if (cartItem.quantity < product.stock) {
      cartItem.quantity++;
    } else {
      alert(`No hay stock suficiente del producto ${product.name}`);
    }
    this.saveCartItems();
    this.calculateTotal();
  }

  decrementQuantity(cartItem: any) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      // Eliminar el producto del carrito si la cantidad llega a 0
      this.cartItems = this.cartItems.filter((item) => item !== cartItem);
    }
    this.calculateTotal();
    if (this.cartItems.length <= 0) {
      this.cleanProductList();
    }
  }

  volver() {
    this.router.navigate(['/principal']);
  }
}

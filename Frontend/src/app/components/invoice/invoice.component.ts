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

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
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
    this.productService.getProducts('products').subscribe((products) => {
      this.products = products || [];
    });
    this.calculateTotal();
  }
  /*
  generarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Factura', 10, 10);
    doc.text(`Precio Final: ${this.totalAmount}€`, 10, 20);
    // ... Agregar más líneas con los detalles de la factura ...

    // Agregar una tabla
    const tableData = [
      ['Producto', 'Cantidad', 'Precio'],
      ['Manzana', 2, 1.5],
      // ... más productos ...
    ];
    doc.autoTable({
      head: tableData[0],
      body: tableData.slice(1),
    });

    doc.save('factura.pdf');
  }*/
  cleanProductList() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
  calculateTotal() {
    this.totalAmount = this.cartItems
      .reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0)
      .toFixed(2);
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
  }

  volver() {
    this.router.navigate(['/principal']);
  }
}

import { Component, OnInit } from '@angular/core';
import { DetailInterface } from '../../interfaces/detail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.css',
})
export class DetailListComponent implements OnInit {
  detailList: DetailInterface[] = [];
  num_factura: number | undefined;
  totalAmount: number = 0;
  iva: number = 0;
  products: ProductInterface[] = [];
  client: ClientInterface | undefined;

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private clientService: ClientService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.num_factura = params['num_factura'];
    });
    if (this.num_factura === undefined) {
      alert('No hagas trampas');
      this.router.navigate(['/invoice-list']);
    } else {
      this.invoiceService
        .getDetail(`detailByInvoiceId?id=${this.num_factura}`)
        .subscribe({
          next: (result: DetailInterface[]) => {
            this.detailList = result;
            this.calculateTotal();
            const productIds = this.detailList.map(
              (detail) => detail.productId
            );
            const productRequests = productIds.map((id) =>
              this.productService.getProductById('product', id.toString())
            );
            forkJoin(productRequests).subscribe((products) => {
              this.products = products;
              this.detailList.forEach((detail) => {
                const product = this.products.find(
                  (p) => p.id === detail.productId
                );
                detail.productName = product?.name;
              });
            });

            this.clientService
              .getClientById(
                `client/byDni?dni=${
                  this.detailList[0].dni ? this.detailList[0].dni : ''
                }`
              )
              .subscribe((client) => {
                this.client = client;
              });
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
    }
  }
  calculateTotal() {
    // Calcular el subtotal sin IVA
    const subtotal = this.detailList.reduce((acc, detail) => {
      return acc + detail.price * detail.quantity;
    }, 0);
    this.iva = Number(subtotal * 0.21);
    this.totalAmount = Number((subtotal + this.iva).toFixed(2));
  }
  downloadExcel() {
    this.http
      .get(
        'http://localhost:8080/v1/api/getExcel?num_factura=' + this.num_factura,
        { responseType: 'blob' }
      )
      .subscribe({
        next: (blob) => {
          console.log(blob);
          saveAs(blob, 'factura_' + this.num_factura + '.xlsx');
        },
        error: (error) => {
          console.error('Error al descargar el archivo:', error);
        },
      });
  }
  volver() {
    this.router.navigate(['/invoice-list']);
  }
}

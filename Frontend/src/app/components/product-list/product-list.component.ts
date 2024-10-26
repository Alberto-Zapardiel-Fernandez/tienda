import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductosComponent implements OnInit {
  productList: ProductInterface[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService,
    private successDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  eliminarProducto(id: number) {
    this.productService.deleteProduct('product', id).subscribe({
      next: () => {
        // Abrir el modal de éxito
        this.successDialog
          .open(SuccessModalComponent, {
            width: '250px',
            data: {
              message: 'Producto eliminado correctamente',
            },
          })
          .afterClosed()
          .subscribe(() => {
            this.productList = this.productList.filter(
              (product) => product.id !== id
            );
            this.getProducts();
            this.changeDetectorRef.detectChanges();
          });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  openModal(productId: number) {
    let dialogRef = this.successDialog.open(SuccessModalComponent, {
      width: '250px',
      data: {
        message: '¿Desea borrar el producto?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarProducto(productId);
      }
    });
  }

  getProducts() {
    this.productService.getProducts('products').subscribe({
      next: (result) => {
        if (result.length > 0) {
          result.forEach((element) => {
            if (!element.imageUrl.startsWith('http://localhost:8080')) {
              element.imageUrl = `http://localhost:8080${element.imageUrl}`;
            }
          });
          this.productList = result;
          console.log(result);
        } else {
          console.error('No se encontraron productos');
        }
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  onImageError(err: any): void {
    err.target.src = 'http://localhost:8080/images/default_image.jpeg';
  }
  volver() {
    this.router.navigate(['/product']);
  }

  modificarProducto(producto: ProductInterface) {
    // Aquí implementarías la lógica para modificar el producto
    console.log('Modificar producto:', producto);
  }
}

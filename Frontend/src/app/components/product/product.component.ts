import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductInterface } from '../../interfaces/product-interface';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @ViewChild('imageInput') imageInput!: ElementRef;
  @ViewChild('imagePreview') imagePreview!: ElementRef;
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(1)])
    ),
    stock: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(1)])
    ),
    idCategory: new FormControl('1', Validators.required),
    image: new FormControl(''),
  });
  categories: CategoryInterface[] = [];
  products: ProductInterface[] = [];
  id: String = '0';
  product: ProductInterface | null = null;

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public successDialog: MatDialog
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != '0') {
        //TODO Modificar el nombre del botón de crear a modificar y hacer el put o llamar al post que hay ya
        this.productService.getProductById('product', this.id).subscribe({
          next: (result) => {
            this.product = result;
            this.productForm.patchValue({
              name: result.name,
              description: result.description,
              price: result.price.toString(),
              stock: result.stock.toString(),
              idCategory: this.product.idCategory.id,
            });
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      }
    });
    // Obtener las categorías desde el servicio
    this.getCategories();
    const fileInput = document.getElementById(
      'fileInput'
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.addEventListener('change', (event: any) => {
        const file: File | null = event.target.files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            (document.getElementById('imagePreview') as HTMLImageElement).src =
              e.target.result as string;
          };

          reader.readAsDataURL(file);

          // Asignar el nombre del archivo al formulario reactivo
          // Asegurarse de que el formulario esté actualizado
          setTimeout(() => {
            this.productForm.patchValue({ image: file.name });
          }, 0);
        }
      });
    }
  }

  //Método para ver los productos y modificarlos
  verProductos() {
    console.log('Ver productos');
    this.router.navigate(['/product-list']);
  }

  public agregarProducto(e: Event) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file: File | null = fileInput.files?.[0] ?? null;
    if (this.productForm.valid) {
      this.productService
        .createProduct(
          'product',
          this.productForm.get('name')?.value ?? '',
          this.productForm.get('description')?.value ?? '',
          Number(this.productForm.get('price')?.value) ?? 1,
          Number(this.productForm.get('stock')?.value) ?? 1,
          Number(this.productForm.get('idCategory')?.value) ?? 1,
          file
        )
        .subscribe({
          next: () => {
            this.successDialog.open(SuccessModalComponent, {
              width: '250px',
              data: {
                message: 'Agregado correctamente',
              },
            });
            this.productForm.reset();
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
    } else {
      console.log('Formulario inválido');
      this.productForm.reset();
    }
  }
  //Método para agregar una categoría a la base de datos
  public agregarCategoria() {
    const dialogRef = this.dialog.open(CategoryModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.createCategory('category', result).subscribe({
        next: () => {
          this.getCategories();
          this.successDialog.open(SuccessModalComponent, {
            width: '250px',
            data: {
              message: 'Nueva categoría agregada correctamente',
            },
          });
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    });
  }
  private getCategories() {
    this.categoryService.getCategories('categories').subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}

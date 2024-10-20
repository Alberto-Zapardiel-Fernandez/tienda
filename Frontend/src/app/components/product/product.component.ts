import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  createForm: FormGroup;
  categories: CategoryInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      idCategory: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Obtener las categorías desde el servicio
    this.getCategories();
  }

  onSubmit() {
    console.log('Enviando');
  }

  //Método para ver los productos y modificarlos
  verProductos() {
    console.log('Ver productos');
  }

  public agregarProducto() {}

  //Método para agregar una categoría a la base de datos
  public agregarCategoria() {
    const dialogRef = this.dialog.open(CategoryModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.createCategory('category', result).subscribe({
        next: (result2) => {
          console.log(result2);
          this.getCategories();
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

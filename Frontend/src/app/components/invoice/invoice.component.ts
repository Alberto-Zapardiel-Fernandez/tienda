import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }

  ngOnInit() {
    this.productService.getProducts('products').subscribe((products) => {
      this.products = products || [];
    });
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
  //TODO En este método agregaremos el producto a una lista para calcular el total, además lo agregamos a la interfaz
  //TODO habrá que poner en la interfaz una parte para sumar o restar cantidad, una x para quitarlo de la lista...
  //TODO Resetear el value del buscador para que desaparezca la lista
  logProductDetails(product: ProductInterface) {
    console.log('Producto seleccionado:', product);
  }
}

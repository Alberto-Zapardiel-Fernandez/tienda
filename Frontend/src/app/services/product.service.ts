import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Assuming you have a Product model
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductById(
    endpoint: String,
    productId: String
  ): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(
      `${this.API_URL}${endpoint}?id=${productId}`
    );
  }
  deleteProduct(endpoint: String, productId: Number) {
    return this.http.delete(`${this.API_URL}${endpoint}?id=${productId}`);
  }
  getProducts(endpoint: string) {
    return this.http.get<ProductInterface[]>(`${this.API_URL}${endpoint}`);
  }
  private API_URL = 'http://localhost:8080/v1/api/';

  constructor(private http: HttpClient) {}

  createProduct(
    endpoint: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    idCategory: number,
    image: File | null = null
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    formData.append('idCategory', idCategory.toString());

    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.post(`${this.API_URL}${endpoint}`, formData, {
      responseType: 'text',
    });
  }
  updateProduct(
    endpoint: string,
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    idCategory: number,
    image: File | null = null
  ): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    formData.append('idCategory', idCategory.toString());
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.put(`${this.API_URL}${endpoint}`, formData, {
      responseType: 'text',
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Assuming you have a Product model

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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

    return this.http.post(`${this.API_URL}${endpoint}`, formData);
  }
}

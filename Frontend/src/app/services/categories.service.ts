import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Asegúrate de tener un modelo de categoría

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  API_URL: String = 'http://localhost:8080/v1/api/';

  constructor(private http: HttpClient) {}

  getCategories(endpoint: String): Observable<any> {
    return this.http.get<any>(`${this.API_URL}${endpoint}`).pipe((res) => res);
  }

  createCategory(
    endpoint: String,
    categoryData: { name: string; description: string }
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(categoryData);
    return this.http.post<any>(`${this.API_URL}${endpoint}`, body, {
      headers,
    });
  }
}

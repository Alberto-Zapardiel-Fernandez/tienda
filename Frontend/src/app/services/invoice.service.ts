import { ProductInterface } from '../interfaces/product-interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceInterface } from '../interfaces/invoice.interface';
import { DetailInterface } from '../interfaces/detail.interface';
@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  getDetail(endpoint: string): Observable<DetailInterface[]> {
    return this.httpClient.get<DetailInterface[]>(`${this.API_URL}${endpoint}`);
  }
  getInvoices(endpoint: string): Observable<InvoiceInterface[]> {
    return this.httpClient.get<InvoiceInterface[]>(
      `${this.API_URL}${endpoint}`
    );
  }
  API_URL: String = 'http://localhost:8080/v1/api/';
  constructor(private httpClient: HttpClient) {}
  generateInvoice(
    endpoint: string,
    dni: string,
    total: number,
    products: ProductInterface[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(products);
    const params = new HttpParams().set('total', total).set('dni', dni);
    return this.httpClient.post<any>(this.API_URL + endpoint, body, {
      headers,
      params,
    });
  }
}

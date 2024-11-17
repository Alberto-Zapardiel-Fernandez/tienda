import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientInterface } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  getClientById(endpoint: string): Observable<ClientInterface> {
    return this.httpClient.get<ClientInterface>(`${this.API_URL}${endpoint}`);
  }
  updateClient(
    endpoint: string,
    clientData: {
      name: string;
      lastName: string;
      email: string;
      address: string;
      dni: string;
      phone: string;
      discount: number;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(clientData); // Convierte el objeto a JSON
    return this.httpClient.put<any>(`${this.API_URL}${endpoint}`, body, {
      headers,
    });
  }
  setClient(
    endpoint: string,
    clientData: {
      name: string;
      lastName: string;
      email: string;
      address: string;
      dni: string;
      phone: string;
      discount: number;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(clientData);
    return this.httpClient.post<any>(this.API_URL + endpoint, body, {
      headers,
    });
  }
  API_URL: String = 'http://localhost:8080/v1/api/';
  response: any;
  constructor(private httpClient: HttpClient) {}

  getClients(endpoint: String): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + '' + endpoint)
      .pipe((res) => res);
  }

  deleteClient(endpoint: string, id: string) {
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete<any>(`${this.API_URL}${endpoint}`, {
      params,
    });
  }
}

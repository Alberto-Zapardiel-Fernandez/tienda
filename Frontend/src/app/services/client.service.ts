import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
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

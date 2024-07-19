import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: String = 'http://localhost:8080/v1/api/';
  response: any;
  constructor(private httpClient: HttpClient) {}

  getUsers(endpoint: String): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + '' + endpoint)
      .pipe((res) => res);
  }

  getUser(
    endpoint: string,
    userData: { email: string; pass: string }
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(userData); // Convierte el objeto a JSON

    return this.httpClient.post<any>(this.API_URL + endpoint, body, {
      headers,
    });
  }

  //Método para hacer el set user con los datos enviados
  setUser(
    endpoint: string,
    userData: {
      name: string;
      lastName: string;
      email: string;
      pass: string;
      rol: number;
      dni: string;
      phone: string;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(userData);
    return this.httpClient.post<any>(this.API_URL + endpoint, body, {
      headers,
    }); // Devuelve la promesa para controlar la ejecución del subscribe
  }
}

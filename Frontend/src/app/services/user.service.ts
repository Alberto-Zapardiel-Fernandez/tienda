import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

    return this.httpClient
      .post<any>(this.API_URL + endpoint, body, {
        headers,
      })
      .pipe((res) => res);
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

  updateUser(
    endpoint: string,
    user: {
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
    const body = JSON.stringify(user); // Convierte el objeto a JSON
    return this.httpClient.put<any>(`${this.API_URL}${endpoint}`, body, {
      headers,
    });
  }
  deleteUser(endpoint: string, id: string) {
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete<any>(`${this.API_URL}${endpoint}`, {
      params,
    });
  }
}

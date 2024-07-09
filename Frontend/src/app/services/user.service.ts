import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: String = 'http://localhost:8080/v1/api/';
  constructor(private httpClient: HttpClient) {}

  getUsers(param: String): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + '' + param)
      .pipe((res) => res);
  }
}

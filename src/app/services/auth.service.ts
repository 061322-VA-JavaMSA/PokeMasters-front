import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from './trainer';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', new URLSearchParams({
      username,
      password
    }), httpOptions);
  }

  register(trainer: Trainer): Observable<any> {
    return this.http.post(AUTH_API + 'trainers', new URLSearchParams(Object.create(trainer)), httpOptions);
  }
}

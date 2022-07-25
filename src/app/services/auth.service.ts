import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenStorageService, TOKEN_KEY } from './token-storage.service';

export const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        AUTH_API + 'login',
        new URLSearchParams({
          username,
          password,
        }),
        httpOptions
      )
      .pipe(
        tap((body) => this.tokenService.saveToken(body[TOKEN_KEY]))
      );
  }

  logout() {
    this.tokenService.deleteToken();
  }

  isLoggedIn() {
    return Math.floor(new Date().getTime() / 1000) < this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let token = this.tokenService.getDecodedAccessToken();
    return token? token.exp: NaN;
  }
}

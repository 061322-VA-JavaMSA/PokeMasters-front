import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private tokenService: TokenStorageService,
    private router: Router,
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
        tap((body) => {
            this.tokenService.saveToken(body[TOKEN_KEY])
            
            if (this.isLoggedIn()) {
              this.router.navigate(['dashboard']);
            }
        })
      );
  }

  logout() {
    this.tokenService.deleteToken();
  }

  isLoggedIn() {
    return Math.floor(new Date().getTime() / 1000) < this.getExpiration();
  }

  getPrincipal(){
    let token = this.tokenService.getDecodedAccessToken();
    return token?.sub
  }

  getPrincipalRole(){
    let token = this.tokenService.getDecodedAccessToken();
    return token?.roles[0]
  }

  getExpiration() {
    let token = this.tokenService.getDecodedAccessToken();
    return token? token.exp: NaN;
  }
}

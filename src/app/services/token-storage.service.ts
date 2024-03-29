import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

export const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  deleteToken(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  getDecodedAccessToken(): Token | null {
    let token = this.getToken();
    return token? jwt_decode(token): null;
  }
}

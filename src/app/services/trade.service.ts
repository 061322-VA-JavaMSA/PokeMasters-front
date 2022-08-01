import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trade } from '../models/trade';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TradeService {

  trades = [];

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  createTrade(trade: Trade) {
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.post(`${environment.apiUrl}/trades/trainer/${id}`,
      trade,
      httpOptions);
  }

  getTrade(id: number) {
    return this.http.get(`${environment.apiUrl}/trades/${id}`);
  }

  updateTrade(trade: Trade) {
    return this.http.put(`${environment.apiUrl}/trades`,
      trade,
      httpOptions);
  }

  deleteTrade(trade: Trade) {
    return this.http.delete(`${environment.apiUrl}/trades/${trade.id}`);
  }

  getOwnedTrades() {
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.get(`${environment.apiUrl}/trades/trainer/${id}`);
  }

  getAvailableTrades() {
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.get(`${environment.apiUrl}/trades/trainer/!${id}`);
  }
}

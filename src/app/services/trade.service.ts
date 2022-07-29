import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trade } from '../models/trade';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TradeService {

  currentTrade!: Trade;
  
  constructor(private http: HttpClient) { }

  createTrade(trade: Trade): Observable<Trade> {
      return this.http.post(`${environment.apiUrl}/trades`,
        trade,
        httpOptions).pipe(
          map(
            response => response as Trade
          )
        )
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getData() {
    const api = "https://pokeapi.co/api/v2/item";
    return this.http.get(api);
  };

  getItem(url: string) {
    return this.http.get(url);
  };
}

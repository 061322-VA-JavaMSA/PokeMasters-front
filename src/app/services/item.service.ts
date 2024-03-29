import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getData(api: string) {
    return this.http.get(api);
  };

  getItem(url: string) {
    return this.http.get(url);
  };

  getShopItems() {
    return this.http.get(`${environment.apiUrl}/items`);
  }

  addItemToShop(item: Item){
    return this.http.post(`${environment.apiUrl}/items`, 
      {
        "apiId": item.id,
        "itemName": item.name,
        "price": item.cost,
        "effect": item.effect,
        "type": item.type,
        "sprite": item.sprite
      }
    , {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addOrUpdate(tid: number, iid:  number) {
    return this.http.post(`${environment.apiUrl}/trainer-items`, {
      "trainerId": tid,
      "itemId": iid
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getTrainerItems(id: number) {
    return this.http.get(`${environment.apiUrl}/trainer-items/${id}`);
  }
}

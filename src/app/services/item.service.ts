import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';

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
    return this.http.get("http://localhost:8080/items");
  }

  addItemToShop(item: Item){
    return this.http.post("http://localhost:8080/items", 
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
    return this.http.post("http://localhost:8080/trainer-items", {
      "trainerId": tid,
      "itemId": iid
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getTrainerItems(id: number) {
    return this.http.get(`http://localhost:8080/trainer-items/${id}`);
  }
}

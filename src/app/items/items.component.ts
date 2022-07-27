import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  api = "https://pokeapi.co/api/v2/item";
  next = "";
  prev = "";
  data = [];
  item: any;
  constructor(private is: ItemService) { 
    this.is.getData(this.api).subscribe((data:any) => {
      this.data=data.results;
      this.next = data.next;
      this.prev = data.previous;
    })
  }

  ngOnInit(): void {
  }

  getItems(url: string) {
    this.is.getItem(url).subscribe((data:any) => {
      let i = new Item(data["id"], data["name"], data["cost"], data["effect_entries"][0]["short_effect"], data["category"]["name"], data["sprites"]["default"]);
      this.item = i;
    })
  }

  list() {
    this.item = undefined;
  }
  getData(api: string) {
    this.is.getData(api).subscribe((data:any) => {
      this.data=data.results;
      this.next = data.next;
      this.prev = data.previous;
    });
  }

  addToShop(item: Item) {
    this.is.addItemToShop(item).subscribe((data: any) => {
      console.log(data);
      if(data != null) {
        alert("Item added")
        this.item = undefined;
      }
    })
  }
}

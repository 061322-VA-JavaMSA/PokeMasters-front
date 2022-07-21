import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  data = [];
  item: any;
  constructor(private is: ItemService) { 
    this.is.getData().subscribe((data:any) => {
      console.warn(data);
      this.data=data.results;
      console.log(this.data);
    })
  }

  ngOnInit(): void {
  }

  getItems(url: string) {
    this.is.getItem(url).subscribe((data:any) => {
      let i = new Item(data["id"], data["name"], data["cost"], data["effect_entries"][0]["short_effect"], data["sprites"]["default"]);
      this.item = i;
      console.log(this.item);
    })
  }

  list() {
    this.item = undefined;
  }
  
}

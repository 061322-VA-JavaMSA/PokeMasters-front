import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {


  data = [];
  constructor(private is: ItemService) {
    this.is.getShopItems().subscribe((data:any) => {
      console.log(data);
      this.data = data;
    });
  }

  ngOnInit(): void {
  }

}

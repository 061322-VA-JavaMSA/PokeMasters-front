import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  token;
  data = [];
  constructor(private is: ItemService, private ts: TokenStorageService) {
    this.is.getShopItems().subscribe((data:any) => {
      console.log(data);
      this.data = data;
    });
    this.token = this.ts.getDecodedAccessToken()?.id;
  }

  ngOnInit(): void {
  }

}

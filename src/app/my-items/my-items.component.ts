import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {

  token;
  data = [];
  constructor(private is: ItemService, private ts: TokenStorageService) {
    this.token = this.ts.getDecodedAccessToken()?.id;
    this.is.getTrainerItems(this.token!).subscribe((data: any) => {
      this.data = data;
    })
  }

  ngOnInit(): void {
  }

}

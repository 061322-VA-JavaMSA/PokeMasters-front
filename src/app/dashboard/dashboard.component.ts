import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
  toMyitems(){
    window.location.href = "myItems";
  }
}

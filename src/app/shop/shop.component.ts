import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  token;
  data = [];
  money: any;

  constructor(private is: ItemService, private ts: TokenStorageService, private trainerS: TrainerService) {
    this.is.getShopItems().subscribe((data:any) => {
      this.data = data;
    });
    this.token = this.ts.getDecodedAccessToken()?.id;
    this.trainerS.getTraienrById(this.token!).subscribe((data:any) => {
      this.money = data.money;
    })
  }

  ngOnInit(): void {
  }

  buyItem(data: any) {
    if(data.price > this.money) {
      alert("You don't have enough money to make this purchase.")
    } else {
      this.is.addOrUpdate(this.token!, data.id).subscribe((d:any) => {
        alert("Item purchased");
      });
      // Need to update the money the trainer has
      this.money = this.money - data.price;
      this.trainerS.updateTrainer(this.token!, this.money).subscribe((update: any) => {
      })
    }

  }

}

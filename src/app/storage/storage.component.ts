import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Box, Storage } from '../models/storage';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css', '../../assets/style/icon.css', '../../assets/style/css2.css']
})
export class StorageComponent implements OnInit {

  storage: any;
  box: any;
  party: Pokemon[] = [];

  constructor(private ss: StorageService) {
   }

  ngOnInit(): void {
    this.getParty();
    this.getStorage();
    this.box = this.storage[this.storage.activeIndex];
  }

  next() {
    this.storage.activeIndex += 1;
    if (this.storage.activeIndex == this.storage.boxes.length) {
      this.storage.activeIndex = 0;
    }
  }

  prev() {
    this.storage.activeIndex -= 1;
    if (this.storage.activeIndex == -1) {
      this.storage.activeIndex = this.storage.boxes.length -1;
    }
  }

  getParty() {}

  getStorage() {
    this.ss.getStorage().subscribe(data => {
      this.storage = data;
    })
  }

}

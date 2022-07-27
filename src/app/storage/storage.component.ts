import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Box, Storage } from '../models/storage';
import { ApiService } from '../services/api.service';
import { PokemonService } from '../services/pokemon.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css', '../../assets/style/icon.css', '../../assets/style/css2.css']
})
export class StorageComponent implements OnInit {

  storage!: Storage;
  pokemon!: any[];
  party: Pokemon[] = [];
  selected!: Pokemon;

  constructor(private ss: StorageService, private ps: PokemonService, private as: ApiService) {
  }

  ngOnInit(): void {
    this.getParty();
    this.getStorage();
  }

  loadBox() {
    this.pokemon = [];
    for (let i = 0; i < 30; i++) {
      this.pokemon[i] = this.storage.boxes[this.storage.activeIndex].pokemon[i] || null;
      let poke = this.pokemon[i];
      if (poke) {
        this.ps.getPokemon(poke.id).subscribe(response => {
          this.pokemon[i] = response;
          this.as.getPokemon(poke.apiId).subscribe(p => {
            this.pokemon[i].data = p;
            // this.box.pokemon[i] = this.ps.populate(this.box.pokemon[i]);
          })
        })
      }
    }
  }

  next() {
    this.storage.activeIndex += 1;
    if (this.storage.activeIndex == this.storage.boxes.length) {
      this.storage.activeIndex = 0;
    }
    this.loadBox();
  }

  prev() {
    this.storage.activeIndex -= 1;
    if (this.storage.activeIndex == -1) {
      this.storage.activeIndex = this.storage.boxes.length - 1;
    }
    this.loadBox();
  }

  getParty() { }

  getStorage() {
    this.ss.getStorage().subscribe(data => {
      console.warn(data);
      this.storage = data;
      console.log(this.storage);
      this.loadBox();
    });
  }

}

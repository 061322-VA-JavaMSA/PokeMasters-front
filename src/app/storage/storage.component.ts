import { Component, OnInit } from '@angular/core';
import { Party } from '../models/party';
import { Pokemon } from '../models/pokemon';
import { Storage } from '../models/storage';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css', '../../assets/style/icon.css', '../../assets/style/css2.css']
})
export class StorageComponent implements OnInit {

  storage!: Storage;
  party!: Party;
  box!: Pokemon[];
  pPokes!: Pokemon[];
  selected!: Pokemon;
  swap: boolean = false;
  label: string = 'Select';

  constructor(private ps: PokemonService) {
  }

  ngOnInit(): void {
    this.getParty();
    this.getStorage();
  }

  selectPokemon(p: Pokemon) {
    this.selected = p;
  }

  switchMode() {
    this.swap = !this.swap;
    this.label = this.swap ? 'Swap' : 'Select'
  }

  swapBox(index: number) {
    let temp = this.selected;
    this.selected = this.box[index];
    this.box[index] = temp || null;
    if (!this.selected) {
      this.saveBox();
    }
  }

  swapParty(index: number) {
    if (this.selected) {
      let temp = this.selected;
      this.selected = this.pPokes[index];
      this.pPokes[index] = temp;
    } else {
      this.selected = this.pPokes[index];
      delete this.pPokes[index];
      let newP: Pokemon[] = [];
      this.pPokes.forEach(p => {
        if (p) {
          newP.push(p);
        }
      })
      this.pPokes = newP;
    }
    this.saveParty();
  }

  placeParty() {
    this.pPokes.push(this.selected);
    this.selected = null as unknown as Pokemon;
  }

  loadBox() {
    this.box = [];
    for (let i = 0; i < 30; i++) {
      this.box[i] = this.storage.boxes[this.storage.activeIndex].pokemon[i] || null;
      let poke: Pokemon = this.box[i];
      if (poke) {
        this.ps.getPokemon(poke.id).subscribe(response => {
          this.box[i] = response;
        })
      }
    }
  }

  loadParty() {
    this.pPokes = this.party.pokemon;
    this.pPokes.forEach(p => {
      this.ps.getPokemon(p.id).subscribe(response => {
        p = response;
      })
    })
  }

  next() {
    this.storage.activeIndex += 1;
    if (this.storage.activeIndex == this.storage.boxes.length) {
      this.storage.activeIndex = 0;
    }
    this.saveStorage();
    this.loadBox();
  }

  prev() {
    this.storage.activeIndex -= 1;
    if (this.storage.activeIndex == -1) {
      this.storage.activeIndex = this.storage.boxes.length - 1;
    }
    this.saveStorage();
    this.loadBox();
  }

  getParty() {
    this.ps.getParty().subscribe(data => {
      console.warn(data);
      this.party = data;
      this.loadParty();
    })
  }

  saveParty() {
    this.party.pokemon = this.pPokes;
    this.ps.saveParty(this.party).subscribe(data => {
      console.warn(data);
      this.party = data;
      this.loadParty();
    })
  }

  saveBox() {
    this.storage.boxes[this.storage.activeIndex].pokemon = this.box;
    this.ps.saveBox(this.storage.boxes[this.storage.activeIndex]).subscribe(data => {
      this.storage.boxes[this.storage.activeIndex] = data
    })
  }

  getStorage() {
    this.ps.getStorage().subscribe(data => {
      this.storage = data;
      this.loadBox();
    });
  }

  saveStorage() {
    this.ps.saveStorage(this.storage).subscribe(data => {
      console.warn(data);
      this.storage = data;
      this.loadBox();
    })
  }

  addPokemon() {
    this.ps.createPokemon(Math.floor(Math.random() * 151) + 1, Math.floor(Math.random() * 99) + 2).subscribe(data => {
      console.warn(data);
      this.getParty();
      this.getStorage();
    });
  }

}

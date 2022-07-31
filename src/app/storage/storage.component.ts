
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../guards/action-required.guard';
import { Party } from '../models/party';
import { Pokemon } from '../models/pokemon';
import { Storage } from '../models/storage';
import { Type } from '../models/type.enum';
import { PokemonService } from '../services/pokemon.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css', '../../assets/style/icon.css', '../../assets/style/css2.css']
})
export class StorageComponent implements OnInit, ComponentCanDeactivate {
  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: any) {
    this.mouseX = event.screenX;
    this.mouseY = event.screenY - 100;
  }

  hasType(type: Type) {
    return type == Type.NONE ? false : true;
  }

  storage: any;
  boxes: any = [];
  index: number = 0;
  party: any;
  box: any = [];
  pPokes: any = [];
  selected: any;
  swap: boolean = false;
  label: string = 'Select';
  pIndex: number = -1;
  bIndex: number = -1;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(private ps: PokemonService) {}

  ngOnInit(): void {
    this.getParty();
    this.getStorage();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.swap && this.selected) {
      return false;
    }
    return true;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = "WARNING: You have not finished moving Pokemon. Proceeding could result in lost data. Press cancel to go back.";
    }
  }

  selectPokemon(p: Pokemon) {
    this.selected = p;
  }

  switchMode() {
    if (!this.swap) {
      this.selected = null as unknown as Pokemon;
    }
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
      this.pPokes.forEach((p: any) => {
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
    this.saveParty();
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
    this.pPokes.forEach((p: any) => {
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

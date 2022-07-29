import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Storage } from '../models/storage';
import { Party } from '../models/party';
import { Trade } from '../models/trade';
import { TradeService } from '../services/trade.service';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  storage!: Storage;
  party!: Party;
  selected!: Pokemon;
  tTrades!: Trade[];
  oTrades!: Trade[];
  activeTrade!: Trade;

  constructor(private modalService: ModalService, private ts: TradeService, private ps: PokemonService) { }

  ngOnInit(): void {
    this.getTrainerTrades();
    this.getOtherTrades();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getTrainerTrades() {

  }

  getOtherTrades() {

  }

  saveTrade() {

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

  saveParty() {
    this.ps.saveParty(this.party).subscribe(data => {
      console.warn(data);
      this.party = data;
      this.loadParty();
    })
  }

  saveBox() {
    this.ps.saveBox(this.storage.boxes[this.storage.activeIndex]).subscribe(data => {
      this.storage.boxes[this.storage.activeIndex] = data
    })
  }

  saveStorage() {
    this.ps.saveStorage(this.storage).subscribe(data => {
      console.warn(data);
      this.storage = data;
      this.loadBox();
    })
  }

  getParty() {
    this.ps.getParty().subscribe(data => {
      console.warn(data);
      this.party = data;
      this.loadParty();
    })
  }

  getStorage() {
    this.ps.getStorage().subscribe(data => {
      this.storage = data;
      this.loadBox();
    });
  }

  loadBox() {
    let box: Pokemon[] = [];
    for (let i = 0; i < 30; i++) {
      box.push(this.storage.boxes[this.storage.activeIndex].pokemon[i] || null);
      let poke: Pokemon = box[i];
      if (poke) {
        this.ps.getPokemon(poke.id).subscribe(response => {
          box[i] = response;
        })
      }
    }
    this.storage.boxes[this.storage.activeIndex].pokemon = box;
  }

  loadParty() {
    this.party.pokemon.forEach(p => {
      this.ps.getPokemon(p.id).subscribe(response => {
        p = response;
      })
    })
  }
}

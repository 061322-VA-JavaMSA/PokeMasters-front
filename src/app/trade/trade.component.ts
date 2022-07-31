import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Status, Trade } from '../models/trade';
import { TradeService } from '../services/trade.service';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';
import { Type } from '../models/type.enum';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  trading = false;
  offering = false;
  storage: any;
  party: any;
  box: any = [];
  pPokes: any = [];
  selected: any;
  myTrades: any = [];
  otherTrades: any = [];
  activeTrade: any;
  selPoke: any;
  pokeId: number = 0;
  range: number = 0;


  constructor(private modalService: ModalService, private ts: TradeService, private ps: PokemonService, private token: TokenStorageService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  selectTrade(trade: Trade) {
    this.activeTrade = trade;
    this.offering = false;
  }

pending(trade: Trade) {
  return trade.status == Status.PENDING ? true : false;
}

accepted(trade: Trade) {
  return trade.status == Status.ACCEPTED ? true : false;
}

  newTrade() {
    this.offering = false;
    this.trading = true;
  }

  offerTrade(trade: any) {
    this.activeTrade = trade;
    this.offering = true;
    this.trading = true;
  }

  confirmTrade() {
    this.activeTrade.offered = this.selected;
    this.ts.updateTrade(this.activeTrade).subscribe();
    this.removePokemon(this.selected);
    if (this.pPokes.length < 6) {
      this.pPokes.push(this.activeTrade.listed);
      this.saveParty();
    } else {
      this.box.push(this.activeTrade.listed);
      this.saveBox();
      this.saveStorage();
    }
    this.refresh();
    this.reset();
  }

  receiveFromTrade() {
      this.ts.updateTrade(this.activeTrade).subscribe();
      this.refresh();
      this.reset();
  }

  cancelTrade() {
    if (this.activeTrade.status == Status.PENDING) {
      this.ts.deleteTrade(this.activeTrade).subscribe();
      this.refresh();
    }
  }

  refresh() {
    this.getParty();
    this.getStorage();
    this.getTrades();
  }

  selectPokemon() {
    this.selPoke = this.selected;
  }

  canSelect(poke: Pokemon): boolean {
    if (!this.activeTrade || poke == null) {
      return false;
    }
    let trade = this.activeTrade;
    if (poke.apiId == trade.requestedId && Math.abs(poke.level - trade.listed.level) <= trade.range) {
      return true;
    }
    return false;
  }

  choosePokemon(poke: Pokemon) {
    if (poke == this.selected) {
      this.selected = null;
    } else {
      this.selected = poke;
    }
  }

  reset() {
    this.activeTrade = null;
    this.selected = null;
    this.trading = false;
    this.selPoke = null;
  }

  message() {
    alert("You haven't selected a pokemon!");
  }

  getTrades() {
    this.ts.getOwnedTrades().subscribe((data: any) => {
      console.warn(data);
      this.myTrades = data;
      this.myTrades.forEach((trade:any) => {
        this.ts.getTrade(trade.id).subscribe((data: any) => {
          trade = data;
        })
      })
    })
    this.ts.getAvailableTrades().subscribe((data: any) => {
      console.warn(data);
      this.otherTrades = data;
      this.otherTrades.forEach((trade:any) => {
        this.ts.getTrade(trade.id).subscribe((data: any) => {
          trade = data;
        })
      })
    })
  }

  getPokemon(p: any) {
    this.ps.getPokemon(p.id).subscribe((data: any) => {

    })
  }

  createTrade() {
    let newTrade: Trade = new Trade(-1, Status.PENDING, this.selPoke, null as unknown as Pokemon, this.pokeId, this.range, this.selected.trainer);
    this.ts.createTrade(newTrade).subscribe(data => {
      this.myTrades.push(data);
    });
    this.removePokemon(this.selPoke);
    this.getTrades();
    this.reset();
  }

  removePokemon(poke: Pokemon) {
    let i = this.pPokes.indexOf(poke);
    if (i == -1) {
      i = this.box.indexOf(poke);
      delete this.box[i];
      this.saveBox();
      this.saveStorage();
    } else {
      delete this.pPokes[i];
      this.saveParty();
    }
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
      this.party = data;
      this.loadParty();
    })
  }

  saveParty() {
    this.party.pokemon = [];
    this.pPokes.forEach((p:any) => {
      if (p) {
        this.party.pokemon.push(p);
      }
    });;
    this.ps.saveParty(this.party).subscribe(data => {
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
      this.storage = data;
      this.loadBox();
    })
  }

  hasType(type: Type): boolean {
    return type == Type.NONE ? false : true;
  }
}

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
    this.getTrades();
    this.getParty();
    this.getStorage();
  }

  ngOnInit(): void {
  }

  selectTrade(trade: Trade) {
    this.activeTrade = trade;
    this.offering = false;
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
    this.ts.updateTrade(this.activeTrade);
    this.getTrades();
  }

  selectPokemon() {
    this.selPoke = this.selected;
  }

  canSelect(poke: Pokemon): boolean {
    if (!this.activeTrade) {
      return false;
    }
    let p = this.activeTrade.listed;
    if (poke.apiId == p.apiId && Math.abs(poke.level - p.level) <= this.activeTrade.range) {
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

  // loadTrade() {
  //   this.trades.forEach((t: any) => {
  //     this.ts.getTrade(t.id).subscribe((d: any) => {
  //       let trade = d;
  //       this.ps.getPokemon(trade.listed.id).subscribe((p: any) => {
  //         let poke = p;
  //         trade.listed = poke;
  //       });
  //       if (trade.offered) {
  //         this.ps.getPokemon(trade.offered.id).subscribe((p: any) => {
  //           let poke = p;
  //           trade.offered = poke;
  //         })
  //       }
  //       console.warn(d)
  //       this.trades.push(d);
  //     })
  //   })
  // }

  getPokemon(p: any) {
    this.ps.getPokemon(p.id).subscribe((data: any) => {

    })
  }

  createTrade() {
    let newTrade: Trade = new Trade(-1, Status.PENDING, this.selPoke, null as unknown as Pokemon, this.pokeId, this.range, this.selected.trainer);
    this.ts.createTrade(newTrade).subscribe(data => {
      this.myTrades.push(data);
    });
    this.getTrades();
    this.reset();
  }

  saveTrade() {

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
    this.party.pokemon = this.pPokes;
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

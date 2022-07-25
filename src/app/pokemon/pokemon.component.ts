import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';
import { Role } from '../models/role.enum';
import { Stat } from '../models/stat';
//import { Trainer } from '../models/trainer';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon[] = [];
  poke: any;
  url: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private pokeServ: PokemonService, private http: HttpClient) { }

  ngOnInit(): void {
    this.pokeServ.createPokemon(1, 5);
    this.pokeServ.createPokemon(4, 5);
    this.pokeServ.createPokemon(7, 5);
    this.getAllPokemon();
  }
/*
  addPoke(apiId: number) {
    let trainer: Trainer = new Trainer(1, 'calvin', '1234', 'pokemaster1', 100, Role.TRAINER);
    this.api.getPokemon(apiId).subscribe((p: any) => this.poke = p);
    let myStats: Stat[] = [];
    let stats = this.poke.stats;
    console.log(stats);
    
    poke.stats.forEach((stat: any) => {
      let s: Stat = new Stat(-1, stat.stat.name, stat.base_stat, (Math.random() * 32), 0);
      myStats.push(s);
    })
    let pokemon: Pokemon = new Pokemon(-1, apiId, poke.sprites.front_default, poke.sprites.back_default, poke.name, 5, 0, myStats, trainer, trainer);
    this.http.post(`${environment.apiUrl}/pokemon`, {
      body: pokemon
    }); 
  }
  */

  getPokemon(apiId: string) {
    this.pokeServ.fetchPokemon(`${this.url + apiId}`).subscribe(data => this.poke = data);
    console.log(this.pokemon);
  }

  getAllPokemon() {
    this.pokeServ.getPokemon().subscribe(
      (pokemon) => {
        this.pokemon = pokemon;
      },
      err => {
        console.log(err);
      }
    )
  }
/*
newPokemon(): void {
  this.obj = this.ps.createPokemon(1);
}
*/
  
}

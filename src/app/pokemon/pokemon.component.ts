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
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: any[] = [];
  pokemon: any;

  constructor(private pokeServ: PokemonService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.pokeServ.getPokemons()
      .subscribe((response: any) => {
        response.results.forEach((result: any) => {
          this.pokeServ.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
    // this.pokeServ.createPokemon(1, 5);
    // this.pokeServ.createPokemon(4, 5);
    // this.pokeServ.createPokemon(7, 5);
    // this.getAllPokemon();
    this.pokeServ.getPokemon(1).subscribe(p => {
      this.pokemon = p;
      console.log(p);
    })
  }



  // getPokemon(apiId: string) {
  //   this.pokeServ.fetchPokemon(`${this.url + apiId}`).subscribe(data => this.poke = data);
  //   console.log(this.pokemon);
  // }

  // getAllPokemon() {
  //   this.pokeServ.getPokemon().subscribe(
  //     (pokemon) => {
  //       this.pokemon = pokemon;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

}

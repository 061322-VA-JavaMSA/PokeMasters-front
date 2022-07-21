import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon[] = [];

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    this.ps.getPokemon().subscribe(
      (pokemon) => {
        this.pokemon = pokemon;
      },
      err => {
        console.log(err);
      }
    )
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPoke } from '../models/apipoke';
import { Nature } from '../models/nature.enum';
import { Pokemon } from '../models/pokemon';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  pokeData: any;

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get(`${environment.apiUrl}/pokemon/${id}`).pipe(
      map(
        response => response as Pokemon
      )
    );
  }

  getPokemons() {
    return this.http.get(`http://pokeapi.co/api/v2/pokemon?limit=10`);
  }

  getMoreData(name: string) {
    return this.http.get(`http://pokeapi.co/api/v2/pokemon/${name}`);
  }

  createPokemon(apiId: number, level: number) {
    this.http.post(`${environment.apiUrl}/pokemon`,
      {
        'apiId': apiId,
        'level': level
      },
      httpOptions).subscribe();
  }

  fetchPokemon(url: string) {
    return this.http.get(url);
  }

  /*
  setData(poke: Pokemon) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${poke.apiId}`)
    .subscribe((data: any) => {
      poke.data = data;
    });
    poke.populate();
  }
  */

  populate(p: Pokemon): Pokemon {
    console.log(p.iv.get('hp'));
    let sprites = p.data['sprites']['versions']['generation-v']['black-white'];
    /*
    if (this.gender == Gender.FEMALE) {
        if (this.shiny) {
            this.sprite.front = sprites.front_shiny_female || sprites.front_shiny;
            this.sprite.back = sprites.back_shiny_female || sprites.back_shiny;
            this.sprite.front_a = sprites.animated.front_shiny_female || sprites.animated.front_shiny;
            this.sprite.back_a = sprites.animated.back_shiny_female || sprites.animated.back_shiny;
        } else {
            this.sprite.front = sprites.front_female || sprites.front_default;
            this.sprite.back = sprites.back_female || sprites.back_default;
            this.sprite.front_a = sprites.animated.front_female || sprites.animated.front_default;
            this.sprite.back_a = sprites.animated.back_female || sprites.animated.back_default;
        }
    } else {
        if (this.shiny) {
            this.sprite.front = sprites.front_shiny;
            this.sprite.back = sprites.back_shiny;
            this.sprite.front_a = sprites.animated.front_shiny;
            this.sprite.back_a = sprites.animated.back_shiny;
        } else {
            this.sprite.front = sprites.front_default;
            this.sprite.back = sprites.back_default;
            this.sprite.front_a = sprites.animated.front_default;
            this.sprite.back_a = sprites.animated.back_default;
        }
    }
    */

    let map: Map<string, string> = new Map();
    if (p.shiny) {
      map.set('front', sprites.front_shiny);
      map.set('back', sprites.back_shiny);
      map.set('front_a', sprites.animated.front_shiny);
      map.set('back_a', sprites.animated.back_shiny);
    } else {
      map.set('front', sprites.front_default);
      map.set('back', sprites.back_default);
      map.set('front_a', sprites.animated.front_default);
      map.set('back_a', sprites.animated.back_default);
    }
    console.log(map);
    p.sprite = map;

    let base: any[] = p.data.stats;
    base.forEach(stat => {
      let name: string = '';

      switch (stat.stat.name) {
        case 'hp': name = 'hp'; break;
        case 'attack': name = 'att'; break;
        case 'defense': name = 'def'; break;
        case 'special-attack': name = 'satt'; break;
        case 'special-defense': name = 'sdef'; break;
        case 'speed': name = 'speed'; break;
        default:
      }
      let iv: number = p.iv.get(name) || 0;
      let ev: number = p.ev.get(name) || 0;
      p.stat.set(name, this.calculateStat(p, name, stat.base_stat, iv, ev));
    })

    return p;
  }

  calculateStat(p: Pokemon, name: string, b: number, i: number, e: number) {
    let stat: number = ((2 * b + i + Math.floor(e / 4)) * p.level) / 100;
    if (name === 'hp') {
      return Math.floor(stat + p.level + 10);
    } else {
      let n = this.getNatureMod(p, name);
      return Math.floor((stat + 5) * n);
    }
  }

  getNatureMod(p: Pokemon, s: string) {
    switch (s) {
      case 'att':
        switch (p.nature) {
          case Nature.LONELY, Nature.BRAVE, Nature.ADAMANT, Nature.NAUGHTY: return 1.1;
          case Nature.BOLD, Nature.TIMID, Nature.MODEST, Nature.CALM: return 0.9;
          default: return 1.0;
        }
      case 'def':
        switch (p.nature) {
          case Nature.BOLD, Nature.RELAXED, Nature.IMPISH, Nature.LAX: return 1.1;
          case Nature.LONELY, Nature.HASTY, Nature.MILD, Nature.GENTLE: return 0.9;
          default: return 1.0;
        }
      case 'satt':
        switch (p.nature) {
          case Nature.MODEST, Nature.MILD, Nature.QUIET, Nature.RASH: return 1.1;
          case Nature.ADAMANT, Nature.IMPISH, Nature.JOLLY, Nature.CAREFUL: return 0.9;
          default: return 1.0;
        }
      case 'sdef':
        switch (p.nature) {
          case Nature.CALM, Nature.GENTLE, Nature.SASSY, Nature.CAREFUL: return 1.1;
          case Nature.NAUGHTY, Nature.LAX, Nature.NAIVE, Nature.RASH: return 0.9;
          default: return 1.0;
        }
      case 'speed':
        switch (p.nature) {
          case Nature.TIMID, Nature.HASTY, Nature.JOLLY, Nature.NAIVE: return 1.1;
          case Nature.BRAVE, Nature.RELAXED, Nature.QUIET, Nature.SASSY: return 0.9;
          default: return 1.0;
        }
      default: return 1.0;
    }
  }

}

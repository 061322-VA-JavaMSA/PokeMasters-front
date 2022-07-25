import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPoke } from '../models/apipoke';
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

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get(`${environment.apiUrl}/pokemon`).pipe(
      map(
        response => response as Pokemon[]
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

  setData(poke: Pokemon) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${poke.apiId}`)
    .subscribe((data: any) => {
      poke.data = data;
    });
    poke.populate();
  }

  // let s: Stat = new Stat(-1, stat.stat.name, stat.base_stat, (Math.random() * 32), 0);
  //   myStats.push(s);

}

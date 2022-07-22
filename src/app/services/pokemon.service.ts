import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';

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

  createPokemon(apiId: number, level: number) {
    let body = `apiId=${apiId}&level=${level}`;
    this.http.post(`${environment.apiUrl}/pokemon`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      observe: 'response'
    }).subscribe();
  }

  fetchPokemon(url: string) {
    return this.http.get(url);
  }

    // let s: Stat = new Stat(-1, stat.stat.name, stat.base_stat, (Math.random() * 32), 0);
    //   myStats.push(s);
}

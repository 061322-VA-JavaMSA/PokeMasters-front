import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Party } from '../models/party';
import { Pokemon } from '../models/pokemon';
import { Box, Storage } from '../models/storage';

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

  createPokemon(apiId: number, level: number): Observable<Pokemon> {
    return this.http.post(`${environment.apiUrl}/pokemon`,
      {
        'apiId': apiId,
        'level': level,
        'trainer': {
          'id': 1,
          'username': 'calvin',
          'password': '1234',
          'displayName': 'pokemaster1',
          'money': 100,
          'role': 'TRAINER'
        }
      },
      httpOptions).pipe(
        map(
          response => response as Pokemon
        )
      )
  }

  fetchPokemon(url: string) {
    return this.http.get(url);
  }

  getStorage(): Observable<Storage> {
    return this.http.get(`${environment.apiUrl}/storage/trainer/calvin`).pipe(
      map(
        response => response as Storage
      )
    );
  }

  saveStorage(s: Storage): Observable<Storage> {
    return this.http.put(`${environment.apiUrl}/storage`,
    s,
    httpOptions).pipe(
      map(
        response => response as Storage
      )
    )
  }

  getParty(): Observable<Party> {
    return this.http.get(`${environment.apiUrl}/party/trainer/calvin`).pipe(
      map(
        response => response as Party
      )
    );
  }

  saveBox(b: Box): Observable<Box> {
    return this.http.put(`${environment.apiUrl}/box`,
    b,
    httpOptions).pipe(
      map(
        response => response as Box
      )
    )
  }

  saveParty(p: Party): Observable<Party> {
    return this.http.put(`${environment.apiUrl}/party`,
    p,
    httpOptions).pipe(
      map(
        response => response as Party
      )
    )
  }

}

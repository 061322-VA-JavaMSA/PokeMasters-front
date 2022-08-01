import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Party } from '../models/party';
import { Pokemon } from '../models/pokemon';
import { Box, Storage } from '../models/storage';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  pokeData: any;

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  getPokemon(id: number) {
    return this.http.get(`${environment.apiUrl}/pokemon/${id}`);
  }

  getPokemons() {
    return this.http.get(`http://pokeapi.co/api/v2/pokemon`);
  }

  getMoreData(name: string) {
    return this.http.get(`http://pokeapi.co/api/v2/pokemon/${name}`);
  }

  createPokemon(apiId: number, level: number){
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.post(`${environment.apiUrl}/pokemon/trainer/${id}`,
      {
        'apiId': apiId,
        'level': level
      },
      httpOptions);
  }

  fetchPokemon(url: string) {
    return this.http.get(url);
  }

  getStorage() {
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.get(`${environment.apiUrl}/storage/trainer/${id}`);
  }

  saveStorage(s: Storage) {
    return this.http.put(`${environment.apiUrl}/storage`, s, httpOptions);
  }

  getParty() {
    let id = this.token.getDecodedAccessToken()?.id;
    return this.http.get(`${environment.apiUrl}/party/trainer/${id}`);
  }

  saveBox(b: Box) {
    return this.http.put(`${environment.apiUrl}/box`, b, httpOptions);
  }

  saveParty(p: Party) {
    return this.http.put(`${environment.apiUrl}/party`, p, httpOptions);
  }

  savePokemon(p: Pokemon) {
    return this.http.put(`${environment.apiUrl}/pokemon/${p.id}`, p, httpOptions);
  }

}

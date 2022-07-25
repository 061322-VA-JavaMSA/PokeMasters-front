import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemon(no: number) {
    return this.http.get(`${this.url}/pokemon/${no}`)
  }
}

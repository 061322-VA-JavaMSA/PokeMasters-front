import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]>{
    return this.http.get(`${environment.apiUrl}/pokemon`, {
      withCredentials: true
    }).pipe(
      map(
        response => response as Pokemon[]
      )
    );
  }
}

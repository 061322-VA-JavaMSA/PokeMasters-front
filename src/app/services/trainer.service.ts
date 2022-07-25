import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  trainersUrl = 'trainers'


  constructor(private http: HttpClient) { }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`http://localhost:8080/${this.trainersUrl}`)
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<Trainer[]>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
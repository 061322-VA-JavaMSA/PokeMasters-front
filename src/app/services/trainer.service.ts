import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { AUTH_API } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  trainersUrl = 'trainers';

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(AUTH_API + this.trainersUrl);
  }

  createTrainer(trainer: Trainer): Observable<any> {
    return this.http.post(AUTH_API + this.trainersUrl, trainer, httpOptions);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<Trainer[]>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getTraienrById(id: number) {
    return this.http.get(`http://localhost:8080/trainers/${id}`);
  }

  updateTrainer(id: number, money: number) {
    return this.http.put(`http://localhost:8080/trainers/${id}`, {
      "money": money
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer';

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
    return this.http.get<Trainer[]>(`${environment.apiUrl}/${this.trainersUrl}`);
  }

  createTrainer(trainer: Trainer): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.trainersUrl}`, trainer, httpOptions);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<Trainer[]>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getTraienrById(id: number) {
    return this.http.get(`${environment.apiUrl}/trainers/${id}`);
  }

  updateTrainer(id: number, money: number) {
    return this.http.put(`${environment.apiUrl}/trainers/${id}`, {
      "money": money
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  deleteTrainerById(id: number) {
    return this.http.delete(`${environment.apiUrl}/trainers/${id}`);
  }
}

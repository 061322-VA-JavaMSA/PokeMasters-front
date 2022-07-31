import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Party } from '../models/party';
import { Box, Storage } from '../models/storage';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: any;
  party: any;
  index = 0;

  constructor(private http: HttpClient, private token: TokenStorageService) {
    this.getStorage();
    this.getParty();
  }

  getStorage() {
    let id = this.token.getDecodedAccessToken()?.id;
    this.http.get(`${environment.apiUrl}/storage/trainer/${id}`).subscribe((data: any) => {
      this.storage = data;
    });
  }

  saveStorage(s: Storage) {
    return this.http.put(`${environment.apiUrl}/storage`, s, httpOptions);
  }

  getParty() {
    let id = this.token.getDecodedAccessToken()?.id;
    this.http.get(`${environment.apiUrl}/party/trainer/${id}`).subscribe((data: any) => {
      this.party = data;
    });
  }

  saveBox(b: Box) {
    return this.http.put(`${environment.apiUrl}/box`, b, httpOptions);
  }

  saveParty(p: Party) {
    return this.http.put(`${environment.apiUrl}/party`, p, httpOptions);
  }

  nextBox() {
    this.index += 1;
    if (this.index == 10) {
      this.index = 0;
    }
  }

  prevBox() {
    this.index -= 1;
    if (this.index == -1) {
      this.index = 9;
    }
  }
}

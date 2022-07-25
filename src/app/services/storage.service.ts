import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '../models/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  getStorage(): Observable<Storage> {
    return this.http.get(`${environment.apiUrl}/storage/trainer/calvin`).pipe(
      map(
        response => response as Storage
      )
    );
  }
}

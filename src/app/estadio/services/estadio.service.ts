import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estadio } from '../interfaces/estadio.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  private baseUrl: string = environment.baseUrl + '/estadio';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Estadio[]> {
    return this.http.get<Estadio[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Estadio | null> {
    return this.http.get<Estadio>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Estadio> {
    return this.http.post<Estadio>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Estadio> {
    return this.http.patch<Estadio>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

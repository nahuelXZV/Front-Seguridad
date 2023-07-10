import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alerta } from '../interfaces/alerta.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private baseUrl: string = environment.baseUrl + '/alerta';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Alerta | null> {
    return this.http.get<Alerta>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Alerta> {
    return this.http.post<Alerta>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Alerta> {
    console.log('data', data);
    return this.http.patch<Alerta>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

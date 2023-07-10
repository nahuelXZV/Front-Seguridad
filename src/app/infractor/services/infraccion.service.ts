import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Infraccion } from '../interfaces/infraccion.interface';


@Injectable({
  providedIn: 'root'
})
export class InfraccionService {

  private baseUrl: string = environment.baseUrl + '/infraccion';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Infraccion[]> {
    return this.http.get<Infraccion[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Infraccion | null> {
    return this.http.get<Infraccion>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Infraccion> {
    return this.http.post<Infraccion>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Infraccion> {
    console.log('data', data);
    return this.http.patch<Infraccion>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sansion } from '../interfaces/sansion.interface';


@Injectable({
  providedIn: 'root'
})
export class SansionService {

  private baseUrl: string = environment.baseUrl + '/sansion';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sansion[]> {
    return this.http.get<Sansion[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Sansion | null> {
    return this.http.get<Sansion>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Sansion> {
    return this.http.post<Sansion>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Sansion> {
    return this.http.patch<Sansion>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

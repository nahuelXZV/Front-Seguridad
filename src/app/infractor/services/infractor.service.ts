import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Infractor } from '../interfaces/infractor.interface';

@Injectable({
  providedIn: 'root'
})
export class InfractorService {

  private baseUrl: string = environment.baseUrl + '/infractor';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Infractor[]> {
    return this.http.get<Infractor[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Infractor | null> {
    return this.http.get<Infractor>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Infractor> {
    return this.http.post<Infractor>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Infractor> {
    return this.http.patch<Infractor>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

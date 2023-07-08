import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documento } from '../interfaces/documento.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private baseUrl: string = environment.baseUrl + 'documento';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Documento | null> {
    return this.http.get<Documento>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<Documento> {
    return this.http.post<Documento>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<Documento> {
    return this.http.patch<Documento>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

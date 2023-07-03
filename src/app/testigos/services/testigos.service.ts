import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Testigo } from '../interfaces/testigo.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { Infraccion } from '../interfaces/infraccion.interface';

@Injectable({
  providedIn: 'root'
})
export class TestigosService {

  private baseUrl: string = environment.baseUrl + '/testigo';
  private baseUrl2: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTestigos(): Observable<Testigo[]> {
    return this.http.get<Testigo[]>(`${this.baseUrl}`);
  }

  getTestigo(id: string): Observable<Testigo | null> {
    return this.http.get<Testigo>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  createTestigo(data: any): Observable<Testigo> {
    return this.http.post<Testigo>(`${this.baseUrl}`, data);
  }

  updateTestigo(testigoId: string,data: any): Observable<Testigo> {
    return this.http.patch<Testigo>(`${this.baseUrl}/${testigoId}`, data);
  }

  deleteTestigo(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }

  getInfracciones(): Observable<Infraccion[]> {
    return this.http.get<Infraccion[]>(`${this.baseUrl2}/infraccion`);
  }
}

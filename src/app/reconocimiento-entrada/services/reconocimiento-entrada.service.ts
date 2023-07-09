import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Infractor } from 'src/app/infractor/interfaces/infractor.interface';

@Injectable({
  providedIn: 'root'
})
export class ReconocimientoEntradaService {

  private baseUrl: string = environment.baseUrl + '/reconocimiento-facial';

  constructor(
    private http: HttpClient,
  ) { }

  ReconocimientoFacial(foto: any): Observable<Infractor | undefined> {
    const myFormData = new FormData();
    myFormData.append('foto', foto, 'photo.png');
    return this.http.post<Infractor>(`${this.baseUrl}`, myFormData).pipe(
      catchError(err => of(undefined))
    );
  }
}

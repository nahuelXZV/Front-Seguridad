import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Alerta } from 'src/app/alerta/interfaces/alerta.interface';

@Injectable({
  providedIn: 'root'
})
export class ReconocimientoTribunaService {

  private baseUrl: string = environment.baseUrl + '/reconocimiento-tribuna';

  constructor(
    private http: HttpClient,
  ) { }

  reconocimientoTribuna(foto: any, data: any): Observable<Alerta | undefined> {
    const myFormData = new FormData();
    myFormData.append('foto', foto, 'photo.png');
    myFormData.append('motivo', data.motivo);
    myFormData.append('fecha', data.fecha);
    myFormData.append('hora', data.hora);
    return this.http.post<Alerta>(`${this.baseUrl}`, myFormData).pipe(
      catchError(err => of(undefined))
    );
  }
}

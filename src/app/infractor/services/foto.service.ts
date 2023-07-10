import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private baseUrl: string = environment.baseUrl + '/files';

  constructor(private http: HttpClient) { }

  create(foto: Array<File>, infractorId: string): Observable<any> {
    const myFormData = new FormData();
    foto.forEach(f => {
      myFormData.append('fotos', f);
    });
    return this.http.post<any>(`${this.baseUrl}?infractor_id=${infractorId}`, myFormData);
  }


}

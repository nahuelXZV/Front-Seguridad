import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.baseUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  getBy(key: string, value: any): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/by/${key}/${value}`).
      pipe(
        catchError(err => of(null))
      );
  }

  create(data: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

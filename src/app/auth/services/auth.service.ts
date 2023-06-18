import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, { email, password });
  }

  checkToken(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.post<boolean>(`${this.baseUrl}/checkToken`, { token }).
      pipe(
        map(user => !!user),
        map(isAuth => {
          if (!isAuth) this.logout();
          return isAuth;
        }),
        catchError(err => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

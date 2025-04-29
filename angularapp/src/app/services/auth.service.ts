import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'https://8080-abeecbbbdbedfffbcadcffcbecabfaedfdcf.premiumproject.examly.io/api';
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/register`, user);
  }

  // Login a user and update role and ID
  login(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiBaseUrl}/login`, login)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            this.userRole.next(response.role);
            this.userId.next(response.id);
          }
        })
      );
  }

  // Get the current user role
  getRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  // Get the current user ID
  getId(): Observable<number | null> {
    return this.userId.asObservable();
  }
}




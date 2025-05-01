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
  private apiBaseUrl = 'https://8080-abeecbbbdbedfffbcadcffcbecabfaedfdcf.premiumproject.examly.io/api/';
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<number | null>(null);
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/register`, user);
  }

  // Login a user and update role and ID
  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/login`, login)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('Role', JSON.stringify(response.role));
            this.userRole.next(response.role);
            this.userId.next(response.id);
            this.currentUserSubject.next(response);
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

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Log out user
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    this.userRole.next(null);
    this.userId.next(null);
    this.currentUserSubject.next(null);
  }
}

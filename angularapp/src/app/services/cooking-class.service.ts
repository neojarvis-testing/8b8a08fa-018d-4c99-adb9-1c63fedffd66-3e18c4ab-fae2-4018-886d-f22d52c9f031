import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookingClassRequest } from '../models/cooking-class-request.model';
import { CookingClass } from '../models/cooking-class.model';

@Injectable({
  providedIn: 'root'
})
export class CookingClassService {
  private apiBaseUrl = '/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Fetch all cooking classes
  getAllCookingClasses(): Observable<CookingClass[]> {
    return this.http.get<CookingClass[]>(`${this.apiBaseUrl}/cookingClass`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get a specific cooking class by ID
  getCookingClassById(classId: string): Observable<CookingClass> {
    return this.http.get<CookingClass>(`${this.apiBaseUrl}/cookingClass/${classId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add a new cooking class
  addCookingClass(cooking: CookingClass): Observable<CookingClass> {
    return this.http.post<CookingClass>(`${this.apiBaseUrl}/cookingClass`, cooking, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing cooking class
  updateCookingClass(classId: string, cooking: CookingClass): Observable<CookingClass> {
    return this.http.put<CookingClass>(`${this.apiBaseUrl}/cookingClass/${classId}`, cooking, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a cooking class by ID
  deleteCookingClass(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/cookingClass/${classId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Fetch all cooking class requests
  getAllCookingClassRequests(): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiBaseUrl}/cooking-class-request`, {
      headers: this.getAuthHeaders()
    });
  }

  // Fetch cooking class requests by user ID
  getCookingClassRequestsByUserId(userId: string): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiBaseUrl}/cooking-class-request/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add a new cooking class request
  addCookingClassRequest(request: CookingClassRequest): Observable<CookingClassRequest> {
    return this.http.post<CookingClassRequest>(`${this.apiBaseUrl}/cooking-class-request`, request, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing cooking class request
  updateCookingClassRequest(requestId: string, request: CookingClassRequest): Observable<CookingClassRequest> {
    return this.http.put<CookingClassRequest>(`${this.apiBaseUrl}/cooking-class-request/${requestId}`, request, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a cooking class request by ID
  deleteCookingClassRequest(requestId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/cooking-class-request/${requestId}`, {
      headers: this.getAuthHeaders()
    });
  }
}

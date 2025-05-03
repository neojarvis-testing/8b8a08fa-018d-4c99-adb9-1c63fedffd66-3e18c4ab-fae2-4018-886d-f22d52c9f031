
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiBaseUrl = 'https://8080-abeecbbbdbedfffbcadcffcbecabfaedfdcf.premiumproject.examly.io/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Send feedback to the server
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiBaseUrl}/feedback`, feedback);
  }

  // Fetch all feedbacks by user ID
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiBaseUrl}/feedback/user/${userId}`);
  }

  // Delete a feedback by its ID
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/feedback/${feedbackId}`);
  }

  // Fetch all feedbacks
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiBaseUrl}/feedback`);
  }
}

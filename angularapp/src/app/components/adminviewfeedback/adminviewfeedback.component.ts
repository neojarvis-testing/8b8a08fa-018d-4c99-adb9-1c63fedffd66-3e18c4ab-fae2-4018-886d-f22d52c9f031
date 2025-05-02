import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbackList = data;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
        alert('Failed to load feedbacks');
      }
    });
  }
}

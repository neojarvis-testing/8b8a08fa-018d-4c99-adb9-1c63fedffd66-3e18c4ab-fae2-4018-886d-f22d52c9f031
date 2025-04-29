import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  // Feedback list (example data)
  feedbacks = [
    { FeedbackId: 1, FeedbackText: 'Amazing class!', SubmittedDate: '2025-04-27' },
    { FeedbackId: 2, FeedbackText: 'Learned so much!', SubmittedDate: '2025-04-28' }
  ];

  // Modal control variables
  showDeleteModal: boolean = false; // Controls the delete confirmation modal
  selectedFeedbackId: number | null = null; // Stores ID of feedback to be deleted

  constructor() {}

  ngOnInit(): void {}

  // Method to show delete confirmation modal
  confirmDelete(feedbackId: number): void {
    this.selectedFeedbackId = feedbackId;
    this.showDeleteModal = true;
  }

  // Method to delete feedback
  deleteFeedback(): void {
    if (this.selectedFeedbackId !== null) {
      this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.selectedFeedbackId);
      this.selectedFeedbackId = null;
      this.showDeleteModal = false;
    }
  }

  // Method to close the delete confirmation modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedFeedbackId = null;
  }
}
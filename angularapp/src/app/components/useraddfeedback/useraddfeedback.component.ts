import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  feedback: string = '';
  showPopup: boolean = false;
  validationMessage: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  submitFeedback() {
    if (!this.feedback.trim()) {
      this.validationMessage = 'Feedback is required';
      return;
    }

    // Get userId from local storage (assuming authentication system stores this)
    const currentUser = localStorage.getItem('currentUser');
    let userId: number | null = null;

if (currentUser) {
  try {
    const parsedUser = JSON.parse(currentUser);
    userId = parsedUser.id; // Extracting 'id' from parsed JSON
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }
}

if (!userId) {
  this.validationMessage = 'User not identified. Please log in.';
  return;
}

    // Create feedback object
    const feedbackData: Feedback = {
      userId,
      feedbackText: this.feedback,
      date: new Date()
    };

    // Send feedback to API
    this.feedbackService.sendFeedback(feedbackData).subscribe({
      next: () => {
        this.validationMessage = '';
        this.showPopup = true; // Show success popup
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
        this.validationMessage = 'Failed to submit feedback. Try again!';
      }
    });
  }

  closePopup() {
    this.showPopup = false;
    this.feedback = ''; // Clear feedback input
  }
}
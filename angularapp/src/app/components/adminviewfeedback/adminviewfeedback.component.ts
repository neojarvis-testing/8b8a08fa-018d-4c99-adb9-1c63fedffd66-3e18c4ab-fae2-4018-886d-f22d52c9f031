import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedUserDetails: any = null; 
  showModal: boolean = false; 

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  private loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks;
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Show Profile method
  showProfile(userDetails: any): void {
    this.selectedUserDetails = userDetails; 
    this.showModal = true; 
  }

  // Close Modal method
  closeModal(): void {
    this.showModal = false; 
    this.selectedUserDetails = null; 
  }
}

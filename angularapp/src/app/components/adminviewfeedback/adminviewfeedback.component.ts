// import { Component, OnInit } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { FeedbackService } from 'src/app/services/feedback.service';

// @Component({
//   selector: 'app-adminviewfeedback',
//   templateUrl: './adminviewfeedback.component.html',
//   styleUrls: ['./adminviewfeedback.component.css']
// })
// export class AdminviewfeedbackComponent implements OnInit {


//   feedbacks: Feedback[] = [];
//   constructor(private feedbackService: FeedbackService) { }
//   ngOnInit(): void {
//     this.loadFeedbacks();
//   }
//   loadFeedbacks(): void {
//     this.feedbackService.getFeedbacks().subscribe({
//       next: (data) => {
//         this.feedbacks = data;
//       },
//       error: (err) => {
//         console.error('Error fetching feedbacks:', err);
//         alert('Failed to load feedbacks');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
        this.loading = false;
      },
      error => {
        console.error('Error loading feedbacks:', error);
        this.error = 'Failed to load feedbacks. Please try again later.';
        this.loading = false;
      }
    );
  }
}
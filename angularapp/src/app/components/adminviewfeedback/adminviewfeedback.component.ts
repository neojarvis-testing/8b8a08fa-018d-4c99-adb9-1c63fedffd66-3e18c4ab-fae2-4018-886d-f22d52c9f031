import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  // Feedback list (example data)
  feedbacks = [
    {
      FeedbackId: 1,
      UserId: 101,
      FeedbackText: 'Great class! Learned a lot.',
      SubmittedDate: '2025-04-27',
      UserDetails: {
        Name: 'John Doe',
        Email: 'johndoe@example.com',
        Contact: '1234567890'
      }
    },
    {
      FeedbackId: 2,
      UserId: 102,
      FeedbackText: 'The class was okay. Expected more details.',
      SubmittedDate: '2025-04-28',
      UserDetails: {
        Name: 'Jane Smith',
        Email: 'janesmith@example.com',
        Contact: '0987654321'
      }
    }
  ];

  // Modal control variables
  selectedUserDetails: any = null; // Stores selected user details for the modal
  showModal: boolean = false; // Toggles modal visibility

  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  // Show Profile method
  showProfile(userDetails: any): void {
    this.selectedUserDetails = userDetails; // Assign selected user details to modal
    this.showModal = true; // Show the modal
  }

  // Close Modal method
  closeModal(): void {
    this.showModal = false; // Hide the modal
    this.selectedUserDetails = null; // Clear the selected user details
  }
}
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent {
  // Form fields for Cooking Class Request
  requestFormData = {
    dietaryPreferences: '',
    cookingGoals: '',
    comments: ''
  };

  // Modal control variables
  showSuccessModal: boolean = false; // Controls visibility of the success modal

  constructor(private router: Router) {}

  // Method to handle form submission
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.showSuccessModal = true; // Display the success modal
    } else {
      alert('All fields are required');
    }
  }

  // Method to close the success modal and navigate to userviewappliedrequest
  closeSuccessModal(): void {
    this.showSuccessModal = false; // Hide the modal
    this.router.navigate(['/userviewappliedrequest']); // Navigate to userviewappliedrequest
  }

  // Method to navigate back to userviewappliedrequest component
  navigateBack(): void {
    this.router.navigate(['/userviewappliedrequest']);
  }
}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  // Form fields for Cooking Class Request
  requestFormData = {
    dietaryPreferences: '',
    cookingGoals: '',
    comments: ''
  };

  // Modal control variables
  showSuccessModal: boolean = false; // Controls visibility of the success modal
  selectedClassId: number | null = null;

  constructor(
    private cookingClassService: CookingClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the selected class ID from local storage
    const storedClassId = localStorage.getItem('selectedClassId');
    if (storedClassId) {
      this.selectedClassId = parseInt(storedClassId, 10);
    }
  }

  // Method to handle form submission
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      alert('All fields are required');
      return;
    }

    if (!this.selectedClassId) {
      alert('No cooking class selected');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not authenticated');
      return;
    }

    // Create the request object
    const request: CookingClassRequest = {
      userId: parseInt(userId, 10),
      cookingClassId: this.selectedClassId,
      requestDate: new Date().toISOString(),
      status: 'Pending',
      dietaryPreferences: this.requestFormData.dietaryPreferences,
      cookingGoals: this.requestFormData.cookingGoals,
      comments: this.requestFormData.comments
    };

    // Submit the request
    this.cookingClassService.addCookingClassRequest(request).subscribe({
      next: () => {
        this.showSuccessModal = true; // Display the success modal
      },
      error: (error) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit request. Please try again.');
      }
    });
  }

  // Method to close the success modal and navigate to userviewappliedrequest
  closeSuccessModal(): void {
    this.showSuccessModal = false; // Hide the modal
    localStorage.removeItem('selectedClassId'); // Clear the selected class ID
    this.router.navigate(['/userviewappliedrequest']); // Navigate to userviewappliedrequest
  }

  // Method to navigate back to userviewappliedrequest component
  navigateBack(): void {
    localStorage.removeItem('selectedClassId'); // Clear the selected class ID
    this.router.navigate(['user/view-requests']);
  }
}
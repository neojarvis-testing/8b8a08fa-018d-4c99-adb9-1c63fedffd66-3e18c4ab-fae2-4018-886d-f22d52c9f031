import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
filteredRequests: any;
showDeleteModal: any;

  constructor() { }

  ngOnInit(): void {
  }

  // Method to handle form submission
  onSubmit(cookingForm): void {
    if (cookingForm.valid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', cookingForm.value); // Logs the form data
    } else {
      alert('All required fields cannot be left empty.');
    }
  }
  goBack(): void {
    alert('Navigating back!');
    // Implement navigation logic, e.g., using Angular Router or any other preferred approach
  }
}

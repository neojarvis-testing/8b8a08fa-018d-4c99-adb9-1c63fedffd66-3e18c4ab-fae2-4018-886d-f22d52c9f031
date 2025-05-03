import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { CookingClass } from 'src/app/models/cooking-class.model';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
  appliedRequests: any[] = []; // Using any to accommodate join data
  filteredRequests: any[] = [];
  searchTerm: string = '';
  showDeleteModal: boolean = false;
  selectedRequestId: number | null = null;

  constructor(private cookingClassService: CookingClassService, private router: Router) { }

  ngOnInit(): void {
    this.loadAppliedRequests();
  }

  loadAppliedRequests(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cookingClassService.getCookingClassRequestsByUserId(userId).subscribe({
        next: (requests) => {
          // For each request, fetch the class details to get the class name
          const requestsWithClassNames = [];
          let completedRequests = 0;

          if (requests.length === 0) {
            this.appliedRequests = [];
            this.filteredRequests = [];
            return;
          }

          requests.forEach(request => {
            this.cookingClassService.getCookingClassById(request.cookingClassId).subscribe({
              next: (cookingClass) => {
                // Create a new object combining both
                const requestWithClass = {
                  ...request,
                  className: cookingClass.className
                };
                requestsWithClassNames.push(requestWithClass);
                
                completedRequests++;
                if (completedRequests === requests.length) {
                  this.appliedRequests = requestsWithClassNames;
                  this.filteredRequests = [...this.appliedRequests];
                }
              },
              error: (error) => {
                console.error('Error fetching class details:', error);
                completedRequests++;
                // Even with error, check if we've processed all requests
                if (completedRequests === requests.length) {
                  this.appliedRequests = requestsWithClassNames;
                  this.filteredRequests = [...this.appliedRequests];
                }
              }
            });
          });
        },
        error: (error) => {
          console.error('Error loading applied requests:', error);
        }
      });
    }
  }

  searchRequests(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRequests = [...this.appliedRequests];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.appliedRequests.filter(request => 
      request.className && request.className.toLowerCase().includes(term)
    );
  }

  confirmDelete(requestId: number): void {
    this.selectedRequestId = requestId;
    this.showDeleteModal = true;
  }

  deleteRequest(): void {
    if (this.selectedRequestId) {
      this.cookingClassService.deleteCookingClassRequest(this.selectedRequestId.toString()).subscribe({
        next: () => {
          this.loadAppliedRequests(); // Reload the list after deletion
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting request:', error);
          this.closeDeleteModal();
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedRequestId = null;
  }

  canDelete(status: string): boolean {
    return status !== 'Approved' && status !== 'Rejected';
  }

  // Method to handle form submission - kept from your original code
  onSubmit(cookingForm): void {
    if (cookingForm.valid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', cookingForm.value); // Logs the form data
    } else {
      alert('All required fields cannot be left empty.');
    }
  }
  
  // Method to go back - kept from your original code
  goBack(): void {
    alert('Navigating back!');
    // Implement navigation logic, e.g., using Angular Router or any other preferred approach
  }
}
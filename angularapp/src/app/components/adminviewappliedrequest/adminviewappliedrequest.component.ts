import { Component, OnInit } from '@angular/core';
import { CookingClass } from 'src/app/models/cooking-class.model';   // Adjust paths if necessary
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model'; // Adjust paths if necessary

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  // List of cooking classes
  cookingClasses: CookingClass[] = [
    {
      CookingClassId: 202,
      ClassName: 'Italian Cooking Basics',
      CuisineType: 'Italian',
      ChefName: 'Chef John Doe',
      Location: 'New York',
      DurationInHours: 3,
      Fee: 500,
      IngredientsProvided: 'Yes',
      SkillLevel: 'Beginner',
      SpecialRequirements: 'None'
    },
    {
      CookingClassId: 203,
      ClassName: 'Grilling Masterclass',
      CuisineType: 'BBQ',
      ChefName: 'Chef Jane Smith',
      Location: 'Texas',
      DurationInHours: 4,
      Fee: 750,
      IngredientsProvided: 'No',
      SkillLevel: 'Intermediate',
      SpecialRequirements: 'Outdoor Grill Required'
    }
  ];

  // List of class requests
  requests: CookingClassRequest[] = [
    {
      CookingClassRequestId: 1,
      UserId: 101,
      CookingClassId: 202,
      RequestDate: '2025-04-28',
      Status: 'Pending',
      DietaryPreferences: 'Vegetarian',
      CookingGoals: 'Master Italian Cuisine',
      Comments: 'Excited to join!'
    },
    {
      CookingClassRequestId: 2,
      UserId: 102,
      CookingClassId: 203,
      RequestDate: '2025-04-27',
      Status: 'Approved',
      DietaryPreferences: 'Non-Vegetarian',
      CookingGoals: 'Learn Grilling Techniques',
      Comments: 'Looking forward to it!'
    }
  ];

  // Filters and Search Terms
  searchClassName: string = '';
  statusFilter: string = '';
  filteredRequests: CookingClassRequest[] = [];

  ngOnInit(): void {
    // Initialize filteredRequests with all requests
    this.filteredRequests = this.requests;
  }

  // Method to get the class name by CookingClassId
  getClassName(cookingClassId: number): string {
    const cookingClass = this.cookingClasses.find(
      (classItem) => classItem.CookingClassId === cookingClassId
    );
    return cookingClass ? cookingClass.ClassName : 'Unknown Class';
  }

  // Method to filter requests based on search term and status
  filterRequests(): void {
    this.filteredRequests = this.requests.filter((request) => {
      const className = this.getClassName(request.CookingClassId).toLowerCase();
      const matchesSearch =
        className.includes(this.searchClassName.toLowerCase());

      const matchesStatus =
        this.statusFilter === '' || request.Status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  // Method to approve a request
  approveRequest(request: CookingClassRequest): void {
    if (request.Status === 'Pending') {
      request.Status = 'Approved';
      alert(
        `Request for Class "${this.getClassName(
          request.CookingClassId
        )}" has been approved.`
      );
      this.filterRequests(); // Refresh the filtered list
    }
  }

  // Method to reject a request
  rejectRequest(request: CookingClassRequest): void {
    if (request.Status === 'Pending') {
      request.Status = 'Rejected';
      alert(
        `Request for Class "${this.getClassName(
          request.CookingClassId
        )}" has been rejected.`
      );
      this.filterRequests(); // Refresh the filtered list
    }
  }
}
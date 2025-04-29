import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';

@Component({
  selector: 'app-admineditclass',
  templateUrl: './admineditclass.component.html',
  styleUrls: ['./admineditclass.component.css']
})
export class AdmineditclassComponent implements OnInit {
  // Cooking Class Model
  cookingClass: CookingClass = {
    ClassName: 'Italian Cooking Basics',
    CuisineType: 'Italian',
    ChefName: 'Chef John Doe',
    Location: 'New York City',
    DurationInHours: 3,
    Fee: 500,
    IngredientsProvided: 'Yes',
    SkillLevel: 'Beginner',
    SpecialRequirements: 'None'
  };

  // Cooking Class Request Model
  cookingClassRequest: CookingClassRequest = {
    UserId: 1,
    CookingClassId: 101,
    RequestDate: '2025-04-28',
    Status: 'Pending',
    DietaryPreferences: 'Vegetarian',
    CookingGoals: 'Learn Italian Cuisine',
    Comments: 'Looking forward to this class!'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Example of fetching or setting data from a backend (if needed)
    console.log('Loaded cooking class data:', this.cookingClass);
    console.log('Loaded cooking class request:', this.cookingClassRequest);
  }

  // Handle form submission for class editing
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Updated Cooking Class:', form.value);
      alert('Cooking class details saved successfully!');
      // Logic to save to backend API can be added here
    } else {
      alert('Please complete the form before submitting.');
    }
  }

  // Navigate back to the admin view class component
  navigateToAdminViewClass(): void {
    this.router.navigate(['/adminviewclass']);
  }
}
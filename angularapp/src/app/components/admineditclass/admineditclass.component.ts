import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-admineditclass',
  templateUrl: './admineditclass.component.html',
  styleUrls: ['./admineditclass.component.css']
})
export class AdmineditclassComponent implements OnInit {
  // Cooking Class Model
  classId: number;
  cookingClass: CookingClass = {
    className: '',
    cuisineType: '',
    chefName: '',
    location: '',
    durationInHours: 0,
    fee: 0,
    ingredientsProvided: '',
    skillLevel: '',
    specialRequirements: ''
  };


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookingService: CookingClassService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      data => this.classId = data['id']
    )
    if (this.classId) {
      this.cookingService.getCookingClassById(this.classId).subscribe(
        data => this.cookingClass = data
      )
    }
  }

  // Handle form submission for class editing
  onSubmit(editClassForm: any): void {
    if (editClassForm.valid) {
      this.cookingService.updateCookingClass(this.classId,editClassForm.value).subscribe()
      console.log(editClassForm.value);
      
      alert('Cooking class details saved successfully!');
      // Logic to save to backend API can be added here
    } else {
      alert('Please complete the form before submitting.');
    }
  }

  // Navigate back to the admin view class component
  navigateToAdminViewClass(): void {
    this.router.navigate(['/admin/view-classes']);
  }
}
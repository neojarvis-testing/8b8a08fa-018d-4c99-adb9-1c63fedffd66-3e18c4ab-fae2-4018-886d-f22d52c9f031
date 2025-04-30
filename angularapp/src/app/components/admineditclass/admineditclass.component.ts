import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { CookingClass } from 'src/app/models/cooking-class.model';

@Component({
  selector: 'app-admineditclass',
  templateUrl: './admineditclass.component.html',
  styleUrls: ['./admineditclass.component.css']
})
export class AdmineditclassComponent implements OnInit {
  cookingClass!: CookingClass;
  classId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookingClassService: CookingClassService
  ) {}

  ngOnInit(): void {
    // Get Class ID from Route Params
    this.route.params.subscribe(params => {
      this.classId = params['id']; // Capture ID from URL
      this.loadCookingClass(); // Fetch class details
    });
  }

  // Load Cooking Class Details using the ID
  loadCookingClass(): void {
    this.cookingClassService.getCookingClassById(this.classId).subscribe({
      next: (data) => this.cookingClass = data,
      error: (err) => console.error('Error fetching class:', err)
    });
  }

  // Submit updated class details
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.cookingClassService.updateCookingClass(this.classId, this.cookingClass).subscribe({
        next: () => {
          alert('Cooking class updated successfully!');
          this.router.navigate(['/adminviewclass']); // Navigate back after success
        },
        error: (err) => console.error('Error updating class:', err)
      });
    } else {
      alert('Please complete the form before submitting.');
    }
  }

  // Navigate Back
  navigateToAdminViewClass(): void {
    this.router.navigate(['/adminviewclass']);
  }
}

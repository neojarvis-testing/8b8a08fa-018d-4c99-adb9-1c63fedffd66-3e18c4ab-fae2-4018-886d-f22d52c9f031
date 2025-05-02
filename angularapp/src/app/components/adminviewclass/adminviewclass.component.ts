import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  classes: Feedback[] = [];
  filteredClasses: Feedback[] = [];
  location: any;

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  private loadClasses(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (classes) => {
        this.classes = classes;
        this.filteredClasses = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  onSubmit(cookingForm: any): void {
    if (cookingForm.valid) {
      const newFeedback: Feedback = {
        UserId: 1, // Assuming a default user ID; update as needed
        FeedbackText: `Cooking Class Updated: ${cookingForm.value.className}`,
        Date: new Date(),
      };

      this.feedbackService.sendFeedback(newFeedback).subscribe(
        (response) => {
          alert('Class updated successfully!');
          console.log('Feedback stored:', response);
        },
        (error) => {
          console.error('Error submitting feedback:', error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  onEdit(classData: Feedback): void {
    alert(`Editing class: ${classData.FeedbackText}`);
    this.router.navigate(['/admineditclass', classData.FeedbackId]); // Navigates to the edit class component
  }

  goBack(): void {
    this.location.back();
  }

  onDelete(classData: Feedback): void {
    const confirmation = confirm(`Are you sure you want to delete the class: ${classData.FeedbackText}?`);
    if (confirmation) {
      this.feedbackService.deleteFeedback(classData.FeedbackId!).subscribe(() => {
        this.classes = this.classes.filter(cls => cls.FeedbackId !== classData.FeedbackId);
        this.filteredClasses = this.classes;
        alert('Class deleted successfully!');
      });
    }
  }
}

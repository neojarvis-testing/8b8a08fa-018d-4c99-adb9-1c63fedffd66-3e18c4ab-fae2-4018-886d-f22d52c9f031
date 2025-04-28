
  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  classes: any;
  filteredClasses: any;
  location: any;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if necessary
  }

  // Method to handle form submission
  onSubmit(cookingForm): void {
    if (cookingForm.valid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', cookingForm.value); // Logs form data to the console
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Method for handling Edit button click
  onEdit(classData: any): void {
    alert(`Editing class: ${classData.name}`);
    // Implement navigation logic to the admineditclass component
  }
  goBack(): void {
    this.location.back(); // Navigate back to the previous page
  }

  // Method for handling Delete button click
  onDelete(classData: any): void {
    const confirmation = confirm(`Are you sure you want to delete the class: ${classData.name}?`);
    if (confirmation) {
      // Logic for deleting the class
      this.classes = this.classes.filter(cls => cls !== classData);
      this.filteredClasses = this.classes; // Update filtered list
      alert('Class deleted successfully!');
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  searchTerm: string = ''; // Search input
  selectedClass: any = null; // Holds the class being considered for deletion or editing
  isEditMode: boolean = false; // Tracks if the component is in edit mode

  // Example data for classes
  classes = [
    {
      name: 'Baking Basics',
      cuisineType: 'Bakery',
      chefName: 'Chef A',
      location: 'New York',
      fee: 50,
      duration: '2 hours',
      skillLevel: 'Beginner'
    },
    {
      name: 'Advanced Pastries',
      cuisineType: 'Desserts',
      chefName: 'Chef B',
      location: 'Paris',
      fee: 100,
      duration: '3 hours',
      skillLevel: 'Advanced'
    },
    {
      name: 'Vegetarian Cooking',
      cuisineType: 'Vegetarian',
      chefName: 'Chef C',
      location: 'London',
      fee: 70,
      duration: '2.5 hours',
      skillLevel: 'Intermediate'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Filter classes based on search term
  get filteredClasses() {
    return this.classes.filter((c) =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Show delete confirmation modal
  confirmDelete(classItem: any): void {
    this.selectedClass = classItem;
  }

  // Delete class if confirmed
  deleteClass(): void {
    if (this.selectedClass) {
      const index = this.classes.indexOf(this.selectedClass);
      if (index > -1) {
        this.classes.splice(index, 1); // Remove the class from the list
        console.log('Deleted class:', this.selectedClass);
      }
      this.selectedClass = null; // Reset selection after deletion
    }
  }

  // Cancel deletion
  cancelDelete(): void {
    this.selectedClass = null;
  }

  // Enable edit mode and load selected class
  editClass(classItem: any): void {
    this.selectedClass = { ...classItem }; // Make a copy of the selected class
    this.isEditMode = true;
  }

  // Save changes to the edited class
  saveEdit(): void {
    const index = this.classes.findIndex(
      (c) => c.name === this.selectedClass.name
    );
    if (index > -1) {
      this.classes[index] = this.selectedClass; // Update class details
      console.log('Edited class:', this.selectedClass);
    }
    this.selectedClass = null; // Reset selected class
    this.isEditMode = false; // Exit edit mode
  }

  // Cancel editing
  cancelEdit(): void {
    this.selectedClass = null;
    this.isEditMode = false; // Exit edit mode
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  searchTerm: string = ''; 
  selectedClass: any = null; 
  isEditMode: boolean = false;

  // Example data for classes
  filteredClasses = [

  ];

  constructor(private cookingService: CookingClassService, private router: Router) { }

  ngOnInit(): void {
    this.cookingService.getAllCookingClasses().subscribe(data => this.filteredClasses = [...data])
  }

  // Filter classes based on search term


  // Show delete confirmation modal
  confirmDelete(classItem: any): void {
    this.selectedClass = classItem;
  }

  // Delete class if confirmed
  // deleteClass(): void {
  //   if (this.selectedClass) {
  //     const index = this.classes.indexOf(this.selectedClass);
  //     if (index > -1) {
  //       this.classes.splice(index, 1); // Remove the class from the list
  //       console.log('Deleted class:', this.selectedClass);
  //     }
  //     this.selectedClass = null; // Reset selection after deletion
  //   }
  // }

  // Cancel deletion
  cancelDelete(): void {
    this.selectedClass = null;
  }

  // Enable edit mode and load selected class
  editClass(classId:number): void {
    this.router.navigate([`admin/edit-class/${classId}`]);
  }

  // Save changes to the edited class
 

  // Cancel editing
  // cancelEdit(): void {
  //   this.selectedClass = null;
  //   this.isEditMode = false; // Exit edit mode
  // }
}
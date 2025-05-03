// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CookingClassService } from 'src/app/services/cooking-class.service';

// @Component({
//   selector: 'app-adminviewclass',
//   templateUrl: './adminviewclass.component.html',
//   styleUrls: ['./adminviewclass.component.css']
// })
// export class AdminviewclassComponent implements OnInit {
//   searchTerm: string = ''; 

//   filteredClasses = [

//   ];

//   constructor(private cookingService: CookingClassService, private router: Router) { }

//   ngOnInit(): void {
//     this.cookingService.getAllCookingClasses().subscribe(data => this.filteredClasses = [...data])
//   }

 
//   confirmDelete(classId: number): void {
//     this.cookingService.deleteCookingClass(classId).subscribe(
//       a=>{this.router.navigate(['admin/view-class'])}
//     )

//   }

//   editClass(classId:number): void {
//     this.router.navigate([`admin/edit-class/${classId}`]);
//   }


// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClassService } from '../../services/cooking-class.service';
import { CookingClass } from '../../models/cooking-class.model';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  cookingClasses: CookingClass[] = [];
  filteredClasses: CookingClass[] = [];
  searchTerm: string = '';
  selectedClass: CookingClass | null = null;
  loading: boolean = true;
  error: string = '';
  showDeleteModal: boolean = false;

  constructor(
    private cookingClassService: CookingClassService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCookingClasses();
  }

  loadCookingClasses(): void {
    this.loading = true;
    this.cookingClassService.getAllCookingClasses().subscribe(
      classes => {
        this.cookingClasses = classes;
        this.filteredClasses = classes;
        this.loading = false;
      },
      error => {
        console.error('Error loading cooking classes:', error);
        this.error = 'Failed to load cooking classes. Please try again later.';
        this.loading = false;
      }
    );
  }

  search(): void {
    if (!this.searchTerm) {
      this.filteredClasses = this.cookingClasses;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredClasses = this.cookingClasses.filter(
      classItem => classItem.className.toLowerCase().includes(term)
    );
  }

  editClass(classId: number): void {
    this.router.navigate([`/admin/edit-class/${classId}`]);
  }

  confirmDelete(cookingClass: CookingClass): void {
    this.selectedClass = cookingClass;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedClass = null;
  }

  deleteClass(): void {
    if (!this.selectedClass || !this.selectedClass.cookingClassId) {
      return;
    }

    const classId = this.selectedClass.cookingClassId;
    
    this.cookingClassService.deleteCookingClass(classId).subscribe(
      () => {
        this.loadCookingClasses();
        this.closeDeleteModal();
      },
      error => {
        console.error('Error deleting cooking class:', error);
        if (error.error && typeof error.error === 'string' && error.error.includes('referenced in a request')) {
          alert('Cooking class cannot be deleted as it is referenced in a request');
        } else {
          alert('Failed to delete cooking class. Please try again.');
        }
        this.closeDeleteModal();
      }
    );
  }
}
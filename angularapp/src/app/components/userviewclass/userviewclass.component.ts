import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-userviewclass',
  templateUrl: './userviewclass.component.html',
  styleUrls: ['./userviewclass.component.css']
})
export class UserviewclassComponent implements OnInit {
  classes: CookingClass[] = [];
  searchText: string = '';
  appliedClassIds: number[] = [];

  constructor(private cookingClassService: CookingClassService, private router: Router) { }

  ngOnInit(): void {
    this.loadClasses();
    this.loadAppliedClasses();
  }

  loadClasses(): void {
    this.cookingClassService.getAllCookingClasses().subscribe(res => {
      this.classes = res;
    });
  }

  loadAppliedClasses(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cookingClassService.getCookingClassRequestsByUserId(userId).subscribe({
        next: (requests) => {
          this.appliedClassIds = requests.map(request => request.cookingClassId);
        },
        error: (error) => {
          console.error('Error loading applied classes:', error);
        }
      });
    }
  }

  applyForClass(classId: number): void {
    localStorage.setItem('selectedClassId', classId.toString());
    this.router.navigate(['/user/add-request']);
  }

  hasApplied(classId: number): boolean {
    return this.appliedClassIds.includes(classId);
  }

  getFilteredClasses(): any[] {
    if (!this.searchText.trim()) {
      return this.classes;
    }

    const term = this.searchText.toLowerCase();
    return this.classes.filter(c =>
      c.className.toLowerCase().includes(term) ||
      c.cuisineType.toLowerCase().includes(term) ||
      c.chefName.toLowerCase().includes(term)
    );
  }
}
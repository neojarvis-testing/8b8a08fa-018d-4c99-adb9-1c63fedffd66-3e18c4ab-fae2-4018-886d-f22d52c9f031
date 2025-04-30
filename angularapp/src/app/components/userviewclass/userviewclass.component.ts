import { Component, OnInit } from '@angular/core';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';

@Component({
  selector: 'app-userviewclass',
  templateUrl: './userviewclass.component.html',
  styleUrls: ['./userviewclass.component.css']
})
export class UserviewclassComponent implements OnInit {
  classes: CookingClass[] = [];
  searchText: string = '';
  appliedClasses: { [key: number]: boolean } = {}; // ✅ Tracks applied state separately

  constructor(private cookingClassService: CookingClassService) {}

  ngOnInit(): void {
    this.loadCookingClasses();
  }

  // Fetch cooking classes dynamically from API
  loadCookingClasses(): void {
    this.cookingClassService.getAllCookingClasses().subscribe({
      next: (data) => {
        this.classes = data; // ✅ No need to modify CookingClass model
      },
      error: (err) => console.error('Error fetching classes:', err)
    });
  }

  // Apply for a cooking class via API (Tracks applied state separately)
  applyForClass(classId: number): void {
    const request: CookingClassRequest = {
      CookingClassId: classId,
      UserId: 1, // Replace with actual user ID
      RequestDate: new Date().toISOString(),
      Status: 'Pending',
      DietaryPreferences: 'None',
      CookingGoals: 'Learn cooking',
      Comments: 'Excited for the class!'
    };
    
    this.cookingClassService.addCookingClassRequest(request).subscribe({
      next: () => {
        this.appliedClasses[classId] = true; // ✅ Tracks applied state separately
      },
      error: (err) => console.error('Error applying for class:', err)
    });
  }

  // Filtering logic for cooking classes
  getFilteredClasses(): CookingClass[] {
    return this.classes.filter(c =>
      c.ClassName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.CuisineType.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.ChefName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

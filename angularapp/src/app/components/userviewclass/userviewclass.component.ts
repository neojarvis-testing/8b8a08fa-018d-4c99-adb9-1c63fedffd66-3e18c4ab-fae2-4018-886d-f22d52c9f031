import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userviewclass',
  templateUrl: './userviewclass.component.html',
  styleUrls: ['./userviewclass.component.css']
})
export class UserviewclassComponent implements OnInit {
  classes = [
    {
      id: 1,
      className: 'Italian Cuisine',
      cuisineName: 'Italian',
      chefName: 'Chef Mario',
      location: 'Rome',
      duration: 3,
      fee: 50,
      ingredientsProvided: 'Yes',
      skillLevel: 'Beginner',
      requirements: 'None',
      applied: false
    },
    {
      id: 2,
      className: 'Baking Basics',
      cuisineName: 'French',
      chefName: 'Chef Pierre',
      location: 'Paris',
      duration: 2,
      fee: 40,
      ingredientsProvided: 'No',
      skillLevel: 'Intermediate',
      requirements: 'Bring your own tools',
      applied: false
    },
    // Add more classes as needed
  ];

  searchText: string = '';

  constructor() { }

  ngOnInit(): void { }

  applyForClass(classId: number): void {
    const selectedClass = this.classes.find(c => c.id === classId);
    if (selectedClass) {
      selectedClass.applied = true;
    }
  }

  getFilteredClasses(): any[] {
    return this.classes.filter(c =>
      c.className.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.cuisineName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.chefName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
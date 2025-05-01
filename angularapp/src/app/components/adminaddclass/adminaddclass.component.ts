import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-adminaddclass',
  templateUrl: './adminaddclass.component.html',
  styleUrls: ['./adminaddclass.component.css']
})
export class AdminaddclassComponent implements OnInit {
  showModal: boolean = false; // Modal visibility flag
  constructor(private cooking: CookingClassService, private router: Router) { }
  cookingclass: CookingClass = {
    className: '',
    cuisineType: '',
    chefName: '',
    location: '',
    durationInHours: 0,
    fee: 0,
    ingredientsProvided: '',
    skillLevel: '',
    specialRequirements: ''
  }
  ngOnInit(): void { }

  onSubmit(classForm: any): void {

    this.cookingclass = classForm.value;

    if (classForm.valid) {
      this.cooking.addCookingClass(this.cookingclass).subscribe();
      classForm.reset();
      this.showModal = true;
      console.log(this.cookingclass);
      
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['admin/view-classes'])
  }
}

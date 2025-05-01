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

  classes : CookingClass[]=[];

  searchText: string = '';

  constructor(private cookingClassService : CookingClassService, private router: Router) { }

  ngOnInit(): void {
    this.loadClasses()
   }

  loadClasses(){
    this.cookingClassService.getAllCookingClasses().subscribe(res=>{
      this.classes = res;
    })
  }

  applyForClass(classId: number): void {
      this.router.navigate(['/user/add-request']);
  }

  getFilteredClasses(): any[] {
    return this.classes.filter(c =>
      c.className.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.cuisineType.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.chefName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
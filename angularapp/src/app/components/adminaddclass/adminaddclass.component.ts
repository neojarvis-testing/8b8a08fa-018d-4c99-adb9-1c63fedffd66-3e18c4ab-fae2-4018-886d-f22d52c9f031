import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adminaddclass',
  templateUrl: './adminaddclass.component.html',
  styleUrls: ['./adminaddclass.component.css']
})

export class AdminaddclassComponent implements OnInit {
  existingClasses: string[] = ['Italian Basics', 'French Cuisine']; 

  constructor() {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      alert('All fields are required'); 
      return;
    }

    const className = form.value.className;

    if (this.existingClasses.includes(className)) {
      alert('Cooking class with the same name already exists'); 
    } else {
      this.existingClasses.push(className); 
      alert('Successfully Added!'); 
      form.reset(); 
    }
  }
}

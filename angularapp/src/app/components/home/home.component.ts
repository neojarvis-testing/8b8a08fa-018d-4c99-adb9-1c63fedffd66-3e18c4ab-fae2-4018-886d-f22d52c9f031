import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  subscribe() {
    console.log('Thank you for subscribing!');
    // Add logic for subscription handling (e.g., API call)
  }

}

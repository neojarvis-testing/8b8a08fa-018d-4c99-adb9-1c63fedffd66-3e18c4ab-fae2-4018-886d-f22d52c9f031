import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Logged out successfully!');
    // Add additional logout logic here, such as clearing session or redirecting to login page
  }

}

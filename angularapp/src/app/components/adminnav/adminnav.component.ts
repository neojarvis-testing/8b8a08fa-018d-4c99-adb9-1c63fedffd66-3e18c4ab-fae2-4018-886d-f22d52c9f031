import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  // State to track dropdown visibility
  isDropdownVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  // Method to toggle the dropdown menu visibility
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout(): void {
    // Logout logic - clear session/local storage and navigate to login
    localStorage.clear();
    sessionStorage.clear();
    console.log('Admin logged out');
    // Add navigation logic here, e.g., using Router
  }
}
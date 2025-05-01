import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

 
  isDropdownHidden: boolean = true;

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

}
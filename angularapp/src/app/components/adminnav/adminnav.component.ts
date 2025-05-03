import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

 
  isDropdownHidden: boolean = true;

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home'])
   }

}
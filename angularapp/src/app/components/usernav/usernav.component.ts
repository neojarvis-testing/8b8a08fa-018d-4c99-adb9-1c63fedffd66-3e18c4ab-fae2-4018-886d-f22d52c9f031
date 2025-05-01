import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {


  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }



  logout(): void {
   this.authService.logout();
   this.router.navigate(['/login'])
  }

}

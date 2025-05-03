import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {
    Email: '',
    Password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    console.log(this.login);
    if (loginForm.invalid) {
      alert("Please fill in all fields correctly");
      return;
    }

    this.authService.login(this.login).subscribe({
      next: user => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin-home']);
        } else {
          this.router.navigate(['/user-home']);
        }
      },
      error: err => {
        console.error('Login failed', err);
        alert('Incorrect Email or password');
      }
    });        
  }
}

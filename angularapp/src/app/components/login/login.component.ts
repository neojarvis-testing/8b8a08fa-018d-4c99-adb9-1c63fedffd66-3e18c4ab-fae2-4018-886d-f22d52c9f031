import { Component, OnInit } from '@angular/core';
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
  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      this.login=loginForm.value;
      console.log('Form Submitted', loginForm.value);
      console.log(this.login);
      
      this.authService.login(this.login).subscribe(data=>this.router.navigate(['home']))
    } else {
      console.log('Form is invalid');
    }
  }

}

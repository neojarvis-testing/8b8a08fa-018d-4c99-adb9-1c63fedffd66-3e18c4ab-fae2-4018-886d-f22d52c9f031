import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      console.log('Form Submitted', loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}

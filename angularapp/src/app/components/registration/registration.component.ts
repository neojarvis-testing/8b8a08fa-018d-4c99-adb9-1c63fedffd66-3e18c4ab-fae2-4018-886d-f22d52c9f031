import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    role: ''
  };

  // Function to handle form submission
  onSubmit(registrationForm: any) {
    if (registrationForm.valid) {
      this.user=registrationForm.value;
      console.log('Form submitted successfully!', this.user);
      // Perform additional actions like making an API call here
    } else {
      console.log('Form is invalid. Please fix errors and try again.');
    }
  }

}

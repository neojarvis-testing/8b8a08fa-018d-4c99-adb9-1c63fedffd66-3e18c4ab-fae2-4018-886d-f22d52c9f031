import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  user: User = {
    Username: '',
    Email: '',
    Password: '',
    MobileNumber: '',
    UserRole: ''
  };

  // Function to handle form submission
  onSubmit(registrationForm: any) {
    if (registrationForm.valid) {
      this.user = registrationForm.value;
      console.log('Form submitted successfully!', this.user);
      // Perform additional actions like making an API call here
      this.authService.register(this.user).subscribe(data =>
        this.router.navigate(['login']))
    } else {
      console.log('Form is invalid. Please fix errors and try again.');
    }
  }

}

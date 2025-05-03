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

  ngOnInit(): void {}

  user: User = {
    Username: '',
    Email: '',
    Password: '',
    MobileNumber: '',
    UserRole: ''
  };

  // Function to validate password matching
  validatePasswordMatch(form: any): boolean {
    return form.value.Password === form.value.confirmPassword;
  }

  // Function to handle form submission with validation
  onSubmit(registrationForm: any) {
    if (!registrationForm.valid) {
      console.log('Form is invalid. Please fix errors and try again.');
      return;
    }

    // Trim username to prevent spaces
    this.user.Username = registrationForm.value.Username.trim();

    // Validate password matching
    if (!this.validatePasswordMatch(registrationForm)) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Form submitted successfully!', this.user);

    // Perform additional actions like making an API call
    this.authService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}

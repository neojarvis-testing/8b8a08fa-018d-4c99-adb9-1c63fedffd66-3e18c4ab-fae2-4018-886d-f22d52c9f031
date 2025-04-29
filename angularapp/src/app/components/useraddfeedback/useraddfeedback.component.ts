import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedback: string = '';
  showPopup: boolean = false;
  validationMessage: string = '';

  submitFeedback() {
    if (!this.feedback.trim()) {
      this.validationMessage = 'Feedback is required';
      return;
    }
    
    this.validationMessage = '';
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.feedback = ''; 
  }

  constructor() { }

  ngOnInit(): void {
  }

}



// import { AfterViewInit, Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit,AfterViewInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

//   subscribe() {
//     console.log('Thank you for subscribing!');
//     // Add logic for subscription handling (e.g., API call)
//   }

//   ngAfterViewInit() {
//     this.animateNumbers();
//     this.animateHeroSection();
//   }

//   animateNumbers() {
//     // Define your target numbers
//     const stats = [
//       { id: '#stat1', endValue: 12 },
//       { id: '#stat2', endValue: 500 },
//       { id: '#stat3', endValue: 50 },
//       { id: '#stat4', endValue: 10 },

//     ];

//     // Animate each stat number
//     stats.forEach(stat => {
//       gsap.to(stat.id, {
//         innerHTML: stat.endValue,
//         duration: 3,
//         ease: "power1.out",
//         snap: { innerHTML: 1 } // Ensures the value increments are integers
//       });
//     });
//   }

//   animateHeroSection() {
//     const tl = gsap.timeline();

//     // Left div slides in from the left
//     tl.from("#leftDiv", {
//       x: "-100%", // Move from outside the left side
//       opacity: 0, // Invisible initially
//       duration: 1,
//       ease: "power1.out"
//     });

//     // Right div slides in from the right
//     tl.from("#rightDiv", {
//       x: "100%", // Move from outside the right side
//       opacity: 0, // Invisible initially
//       duration: 1,
//       ease: "power1.out"
//     }, "-=0.5"); // Overlap animation by 0.5 seconds
//   }


  

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    const userInfo = this.authService.getUserInfo();
    this.username = userInfo.username;
  }
}


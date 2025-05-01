import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  ngOnInit(): void {
    this.getRole();
  }
  MyRole: any = localStorage.getItem('Role');
  getRole(): void {

    console.log(this.MyRole);
  }




}

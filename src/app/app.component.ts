import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MapzProject';
  role: string;

  constructor() {
    this.role = JSON.parse(localStorage.getItem('currentUser')).role[0].name;
  }

  items = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
    {title: 'Purchased-ticket', path: '/purchased-ticket'},
    {title: 'Admin', path: '/admin'},
  ];

  Logout() {
    localStorage.clear();
  }
}

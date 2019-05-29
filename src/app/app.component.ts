import { Component } from '@angular/core';
import {routing} from './app.routing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private router: Router;

  items = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
    {title: 'Purchased-ticket', path: '/purchased-ticket'},
    {title: 'Admin', path: '/admin', role: 'ROLE_ADMIN'},
    {title: 'Tickets', path: '/admin/tickets', role: 'ROLE_ADMIN'},
  ];

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

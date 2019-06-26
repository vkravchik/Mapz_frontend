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
    {title: 'Логін', path: '/login'},
    {title: 'Куплені білети', path: '/purchased-ticket'},
    {title: 'Фільми', path: '/admin', role: 'ROLE_ADMIN'},
    {title: 'Білети', path: '/admin/tickets', role: 'ROLE_ADMIN'},
  ];

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

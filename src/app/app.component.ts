import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // currentUser = this.authService.currentUserSubject.value;
  currentUser;
  currentUserRole = 'ROLE_USER';

  items = [
    {title: 'Логін', path: '/login'},
    {title: 'Куплені білети', path: '/purchased-ticket'},
    {title: 'Фільми', path: '/admin', role: 'ROLE_ADMIN'},
    {title: 'Білети', path: '/admin/tickets', role: 'ROLE_ADMIN'},
  ];

  constructor(private router: Router,
              private authService: AuthService) {
  }

  Logout() {
    // this.authService.currentUserSubject.next(null);
    this.authService.logout();
    // localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(res => {
      this.currentUser = res;
      if (res) {
        this.currentUserRole = res.roles[0].name;
      }
    });
  }

  Login() {
    this.router.navigateByUrl('/login');
  }
}

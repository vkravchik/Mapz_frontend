import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MapzProject';

  items = [
    {title: 'Мій Профіль', path: '/user'},
  ];
}
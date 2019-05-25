import {Component, OnInit} from '@angular/core';
import {FilmService} from '../../services/film.service';
import {Film} from '../../models/Film';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Singleton} from '../../models/Singleton';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<Film>();
  role: string;

  constructor(private filmService: FilmService,
              private router: Router) { }

  ngOnInit() {
    this.getAll();
    this.role = JSON.parse(localStorage.getItem('currentUser')).role[0].name;
  }

  private getAll() {
    this.filmService.getAll().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  buyTicket(id) {
    this.router.navigateByUrl(`tickets/film/${id}`);
  }
}

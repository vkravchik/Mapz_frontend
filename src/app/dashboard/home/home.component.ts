import {Component, OnInit} from '@angular/core';
import {FilmService} from '../../services/film.service';
import {Film} from '../../models/Film';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<Film>();
  role: string;
  toggle = false;

  constructor(private filmService: FilmService,
              private router: Router,
              public search: SearchService) {
  }

  ngOnInit() {
    this.getAll();
    this.role = JSON.parse(localStorage.getItem('currentUser')).role[0].name;
    this.search.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => this.searchFunc(term));
  }

  private getAll() {
    this.filmService.getAll().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  buyTicket(id) {
    return this.router.navigateByUrl(`tickets/film/${id}`);
  }

  changeToggle() {
    this.toggle = !this.toggle;
  }

  searchFunc(value) {
    if (this.toggle) {
      this.filmService.searchByGenre(value).subscribe(res => {
        this.dataSource.data = res;
      });
    } else {
      this.filmService.searchByName(value).subscribe(res => {
        this.dataSource.data = res;
      });
    }
    if (value === '') {
      this.getAll();
    }
  }
}

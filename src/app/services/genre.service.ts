import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Genre} from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient,
              private alert: AlertService) {

  }


  getAll(): Observable<Genre[]> {
    return this.http.get(`${environment.apiUrl}/genres`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }
}

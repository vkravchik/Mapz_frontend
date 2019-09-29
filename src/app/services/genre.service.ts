import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Genre} from '../models/Genre';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  dialogData: any;

  constructor(private http: HttpClient,
              private alert: AlertService,
              private toastr: ToastrService) {

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

  delete(id: number): Observable<any> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.delete(`${environment.apiUrl}/genres/${id}`, {headers: headers}).pipe(
      map(res => {
        return of(200);
      }),
      catchError(err => {
        this.toastr.error(err);
        return of(null);
      })
    );
  }

  add(genre: Genre): Observable<Genre> {
    const body = JSON.stringify(genre);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(`${environment.apiUrl}/genres`, body, {headers: headers}).pipe(
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

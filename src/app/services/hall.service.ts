import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Film} from '../models/Film';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Hall} from '../models/Hall';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http: HttpClient,
              private alert: AlertService) { }

  getAll(): Observable<Hall[]> {
    return this.http.get(`${environment.apiUrl}/halls`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  getSingle(id: number): Observable<Hall> {
    return this.http.get(`${environment.apiUrl}/halls/${id}`).pipe(
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

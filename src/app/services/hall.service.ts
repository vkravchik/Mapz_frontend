import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Film} from '../models/Film';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Hall} from '../models/Hall';
import {Genre} from '../models/Genre';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  dialogData: any;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
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

  delete(id: number): Observable<any> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.delete(`${environment.apiUrl}/halls/${id}`, {headers: headers}).pipe(
      map(res => {
        return of(200);
      }),
      catchError(err => {
        this.toastr.error(err);
        return of(null);
      })
    );
  }

  add(hall: Hall): Observable<Genre> {
    const body = JSON.stringify(hall);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(`${environment.apiUrl}/halls`, body, {headers: headers}).pipe(
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

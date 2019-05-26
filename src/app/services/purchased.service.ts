import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {Film} from '../models/Film';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {PurchasedTicket} from '../models/PurchasedTicket';

@Injectable({
  providedIn: 'root'
})
export class PurchasedService {
  constructor(private http: HttpClient,
              private alert: AlertService) { }

  getAll(): Observable<Film[]> {
    return this.http.get(`${environment.apiUrl}/purchased`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  getSingle(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/purchased/${id}`).pipe(
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete(`${environment.apiUrl}/purchased/${id}`, {headers: headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  add(purchased: any): Observable<Film> {
    const body = JSON.stringify(purchased);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/purchased`, body, {headers: headers}).pipe(
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

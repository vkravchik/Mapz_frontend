import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Film} from '../models/Film';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Ticket} from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  dialogData: any;

  constructor(private http: HttpClient,
              private alert: AlertService) { }

  getAllById(id): Observable<Film[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);

    return this.http.get(`${environment.apiUrl}/tickets/film`, {headers: headers, params: params}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  getAll(): Observable<Ticket[]> {
    return this.http.get(`${environment.apiUrl}/tickets`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getSingle(id: number): Observable<Ticket> {
    return this.http.get(`${environment.apiUrl}/tickets/${id}`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  update(ticket: Ticket): Observable<Ticket> {
    const body = JSON.stringify(ticket);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`${environment.apiUrl}/tickets/${ticket.id}`, body, {headers: headers}).pipe(
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

    return this.http.delete(`${environment.apiUrl}/tickets/${id}`, {headers: headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  add(ticket: Ticket): Observable<Ticket> {
    const body = JSON.stringify(ticket);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/tickets`, body, {headers: headers}).pipe(
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

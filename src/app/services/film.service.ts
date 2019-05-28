import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Film} from '../models/Film';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private films: Film[];

  constructor(private http: HttpClient,
              private alert: AlertService) { }

  getAll(): Observable<Film[]> {
    return this.http.get(`${environment.apiUrl}/films`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  getSingle(id: number): Observable<Film> {
    return this.http.get(`${environment.apiUrl}/films/${id}`).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  update(film: Film): Observable<Film> {
    const body = JSON.stringify(film);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`${environment.apiUrl}/films`, body, {headers: headers}).pipe(
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

    return this.http.delete(`${environment.apiUrl}/films/${id}`, {headers: headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  add(film: Film): Observable<Film> {
    const body = JSON.stringify(film);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/films`, body, {headers: headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  searchByName(value): Observable<Film[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('search', value);
    return this.http.get(`${environment.apiUrl}/films/findAllByName`, {headers, params}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  searchByGenre(value): Observable<Film[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('search', value);
    return this.http.get(`${environment.apiUrl}/films/findAllByGenre`,  {headers, params}).pipe(
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

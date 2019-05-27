import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AlertService} from './alert.service';
import {NextObserver, Observable, of} from 'rxjs';
import {Film} from '../models/Film';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {PurchasedTicket} from '../models/PurchasedTicket';
import {promise} from 'selenium-webdriver';
import filter = promise.filter;

@Injectable({
  providedIn: 'root'
})
export class PurchasedService {
  constructor(private http: HttpClient,
              private alert: AlertService) {
  }

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

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

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

  add(purchased: any): Observable<PurchasedTicket> {
    const body = JSON.stringify(purchased);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

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

  getAllByUserid(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.apiUrl}/purchased/getAllByUser`, {headers: headers, params: params}).pipe(
      map((res: PurchasedTicket) => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  getAllByUseridArchived(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.apiUrl}/purchased/getAllByUserArchived`, {headers: headers, params: params}).pipe(
      map((res: PurchasedTicket) => {
        return res;
      }),
      catchError(err => {
        this.alert.error(err);
        return of(null);
      })
    );
  }

  setStatusTrue(id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // const params = new HttpParams().set('id', id);
    return this.http.post(`${environment.apiUrl}/purchased/setStatusTrue/${id}`, headers).pipe(
      map(res => {
        return res;
      })
    );
  }
}

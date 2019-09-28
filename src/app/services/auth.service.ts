import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Singleton} from '../models/Singleton';
import * as jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('username')));
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, {username, password})
      .pipe(map(user => {
        if (user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          const token = user.accessToken;
          this.userService.getByUsername(jwt_decode(token).username).subscribe((res: User) => {
            localStorage.setItem('id', res.id.toString());
            localStorage.setItem('username', JSON.stringify(res));
            this.currentUserSubject.next(res);
          });
        }
        return user;
      }));
  }

  decodeToken(token) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  async logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    await localStorage.clear();
  }
}

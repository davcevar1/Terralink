import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

import { LoginParams } from './login-params';

@Injectable()
export class AuthService {
  private loggedInSource = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}
  login(loginParams: LoginParams) {
    let url: string = environment.serverPath + environment.authentication.oauth.tokenEndpoint;
    let authorizationDetail: object = {
      grant_type: 'password',
      response_type: 'token',
      client_id: environment.authentication.oauth.clientId,
      client_secret: environment.authentication.oauth.clientSecret
    };
    return this.http.post(url, Object.assign(loginParams, authorizationDetail))
      .do(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.loggedInSource.next(true);
      });
  }
  logout() {
    localStorage.removeItem('token');
    this.loggedInSource.next(false);
    this.router.navigateByUrl('/login');
  }
  getToken() {
    let token = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : null;
    if (token) {
      this.loggedInSource.next(true);
    }
    return token;
  }
}

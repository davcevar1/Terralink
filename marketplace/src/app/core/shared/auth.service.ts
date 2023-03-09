import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of, from} from 'rxjs';
import {tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {FirebaseStorage} from 'angularfire2';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSource.asObservable();
  private configurationSource: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  configuration$: Observable<any> = this.configurationSource.asObservable();
  router: Router;

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private db: AngularFirestore
  ) {
  }

  login(formValue: { username: string, password: string, id: string }) {
    return from(this.db.collection('marketplace-users').ref.where('username', '==', formValue.username)
      .get()
      .then((query:any) => {
        if (query.isEmpty) {
          return null;
        }
        query.forEach(doc => {
          const fid = doc.id;
          const token = this.setToken(formValue.username, fid, doc.data().firstName, doc.data().lastName);
          this.checkAuth();
          return token;
        });
      }));
  }

  logout(url?: string) {
    this.router = this.injector.get(Router);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete sessionStorage['cart'];
    this.loggedInSource.next(false);
    this.router.navigateByUrl(url ? url : '/login');
  }

  getToken() {
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    return token;
  }

  checkAuth() {
    if (this.getToken()) {
      const config = localStorage.getItem('config')? JSON.parse(localStorage.getItem('config')) : null;
      this.configurationSource.next(config);
      this.loggedInSource.next(true);
      return of(config);
    } else {
      return false;
    }
  }

  setToken(username, fid, firstName, lastName) {
    const token = {
      access_token: 'd8dd27e4-cae7-4c8f-b2ba-c9adf0fa7611',
      token_type: 'bearer',
      refresh_token: '27f00200-b662-45b0-8a2b-b169cb19059e',
      expires_in: 7199,
      scope: 'read write trust'
    };
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('config', JSON.stringify({
      id: fid,
      username: username,
      firstName: firstName,
      lastName: lastName
    }));
    localStorage.setItem('fid', fid);
    return token;
  }
}

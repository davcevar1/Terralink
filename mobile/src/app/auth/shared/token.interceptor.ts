import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private auth: AuthService;
  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(AuthService);
    let token = this.auth.getToken();
    if (token){
      request = request.clone({
        headers: request.headers.set('Authorization', `${token.token_type} ${token.access_token}`)
      });
    }
    return next.handle(request).do(event => {}, err => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
            this.auth.logout();
        }
    });
  }
}

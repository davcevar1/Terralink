import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor {
  private authService: AuthService;

  constructor(
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService); 
    let token = this.authService.getToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `${token.token_type} ${token.access_token}`)
      });
    }
    return next.handle(request).pipe(
      tap(event => { }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.authService.logout();
          }
        }
      })
    );
  }
}

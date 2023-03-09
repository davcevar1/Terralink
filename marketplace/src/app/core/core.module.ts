import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './shared/auth.service';
import { SessionService } from './shared/session.service';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './shared/auth-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CoreRoutingModule
  ],
  declarations: [
    LoginComponent,
    ErrorComponent
  ],
  providers: [
    SessionService,
    UserService,
    AuthService,
   {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => function() {return authService.checkAuth()},
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }

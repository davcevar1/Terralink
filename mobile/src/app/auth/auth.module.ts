import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { LoginRedirectGuard } from './shared/login-redirect.guard';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginRedirectGuard
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }

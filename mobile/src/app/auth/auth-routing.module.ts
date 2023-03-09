import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginRedirectGuard } from './shared/login-redirect.guard';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [LoginRedirectGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

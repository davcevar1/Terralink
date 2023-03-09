import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './shared/login.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      icon: '404',
      title: 'Página no encontrada',
      message: 'No hemos encontrado ésta página'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

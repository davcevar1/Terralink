import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/shared/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders/:number',
    component: OrderComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

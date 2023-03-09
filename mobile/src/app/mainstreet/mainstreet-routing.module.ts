import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { InfoComponent } from './info/info.component';
import { SimulateComponent } from './simulate/simulate.component';
import { CreditComponent } from './credit/credit.component';

const routes: Routes = [
  {
      path: 'orders',
      component: OrdersComponent
  },
  {
      path: 'orders/:id',
      component: OrderDetailComponent
  },
  {
      path: 'catalog',
      component: CatalogComponent
  },
  {
      path: 'cart',
      component: CartComponent
  },
  {
      path: 'product/:id',
      component: ProductComponent
  },
  {
      path: 'info',
      component: InfoComponent
  },
  {
      path: 'simulate',
      component: SimulateComponent
  },
  {
      path: 'credit',
      component: CreditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainstreetRoutingModule { }

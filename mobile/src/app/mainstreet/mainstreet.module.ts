import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainstreetRoutingModule } from './mainstreet-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { InfoComponent } from './info/info.component';
import { SimulateComponent } from './simulate/simulate.component';
import { CreditComponent } from './credit/credit.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainstreetRoutingModule
  ],
  declarations: [OrdersComponent, CatalogComponent, ProductComponent, CartComponent, InfoComponent, SimulateComponent, CreditComponent, OrderDetailComponent]
})
export class MainstreetModule { }

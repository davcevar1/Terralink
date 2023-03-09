import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConnectComponent } from './connect/connect.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';

import { ProductService } from './shared/product.service';
import { BrandService } from './shared/brand.service';
import { TermService } from './shared/term.service';
import { CartItemService } from './shared/cart-item.service';
import { CartStateService } from './shared/cart-state.service';
import { BannerService } from './shared/banner.service';
import { OrderService } from './shared/order.service';
import { OrderItemService } from './shared/order-item.service';
import { WizardStepsService } from './shared/wizard-steps.service';
import { CreditRequestComponent } from './credit-request/credit-request.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NumericTextBoxModule,
    ReactiveFormsModule,
    StoreRoutingModule,
    SharedModule
  ],
  providers: [
    ProductService,
    BrandService,
    BannerService,
    TermService,
    CartItemService,
    OrderService,
    OrderItemService,
    CartStateService,
    WizardStepsService
  ],
  declarations: [
    CatalogComponent,
    SearchComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    ConnectComponent,
    ConfirmationComponent,
    OrdersComponent,
    OrderComponent,
    CreditRequestComponent
  ]
})
export class StoreModule { }

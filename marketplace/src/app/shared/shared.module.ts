import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconComponent } from './icon/icon.component';
import { BaseComponent } from './layouts/base/base.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';
import { WizardStepsComponent } from './wizard-steps/wizard-steps.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    IconComponent,
    BaseComponent,
    CheckoutComponent,
    ProductCardComponent,
    OrderItemComponent,
    WizardStepsComponent
  ],
  declarations: [
    IconComponent,
    BaseComponent,
    ProductCardComponent,
    OrderItemComponent,
    CheckoutComponent,
    WizardStepsComponent
  ]
})
export class SharedModule { }

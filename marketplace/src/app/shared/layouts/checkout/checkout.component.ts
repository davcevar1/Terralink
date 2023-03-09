import { Component, OnInit } from '@angular/core';

import { CartItemService } from '../../../store/shared/cart-item.service';
import { CartStateService } from '../../../store/shared/cart-state.service';
import { WizardStepsService } from '../../../store/shared/wizard-steps.service';

@Component({
  selector: 'layout-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    public stepService: WizardStepsService,
    private cartItemService: CartItemService,
    public cartStateService: CartStateService
  ) { }

  ngOnInit() {
    this.cartItemService.find().subscribe((response:any)=>{
      this.cartStateService.setItems(response);
    });
  }

}

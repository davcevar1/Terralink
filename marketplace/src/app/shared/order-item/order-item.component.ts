import { Component, OnInit, Input } from '@angular/core';

import { CartItemService } from '../../store/shared/cart-item.service';
import { CartStateService } from '../../store/shared/cart-state.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() item: any;
  @Input() editable: boolean = true;
  @Input() navigable: boolean = true;
  editing: boolean;
  quantity: number;

  constructor(
    public cartItemService: CartItemService,
    public cartStateService: CartStateService,
  ) { }

  ngOnInit() {
    this.quantity = this.item.quantity;
  }
  cancel(event) {
    event.stopPropagation();
    this.editing = false;
  }
  edit(item:any, event) {
    event.stopPropagation();
    this.editing = true;
  }
  plusQuantity(event) {
    event.stopPropagation();
    this.quantity++;
  }
  minusQuantity(event) {
    event.stopPropagation();
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  remove(item:any, event) {
    event.stopPropagation();
    this.cartItemService.delete(item.id).subscribe((response:any)=>{
      this.cartStateService.deleteItem(item);
    });
  }
  put(item:any, event) {
    event.stopPropagation();
    this.item.quantity = this.quantity;
    this.cartItemService.put(item.id, item).subscribe((response:any)=>{
      this.editing = false;
    });
  }

}

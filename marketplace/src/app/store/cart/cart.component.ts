import { Component, OnInit } from '@angular/core';

import { CartItemService } from '../shared/cart-item.service';
import { CartStateService } from '../shared/cart-state.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[];
  crossSell: any[];

  constructor(
    private cartItemService: CartItemService,
    public cartStateService: CartStateService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.cartItemService.find().subscribe((response:any)=>{
      this.cartItems = response;
    });
    this.productService.find().subscribe((response:any)=>{
      this.crossSell = response.sort(function() {
        return .5 - Math.random();
      }).slice(0, 4);
    });
  }

}

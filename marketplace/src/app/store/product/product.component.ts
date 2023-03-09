import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs';

import {ProductService} from '../shared/product.service';
import {CartItemService} from '../shared/cart-item.service';
import {CartStateService} from '../shared/cart-state.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  quantity: number = 1;
  crossSell: any[];

  constructor(
    private productService: ProductService,
    private cartItemService: CartItemService,
    private cartStateService: CartStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.productService.get(params.get('id'));
    }).subscribe((response: any) => {
      window.scroll(0, 0);
      this.product = response;
    });
    this.productService.find().subscribe((response: any) => {
      this.crossSell = response.sort(function () {
        return .5 - Math.random();
      }).slice(0, 4);
    });
  }

  plusQuantity() {
    this.quantity++;
  }

  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(quantity: number, product: any) {
    let item = this.cartStateService.items.find((_item) => {
      return _item.product_id == product.id;
    });
    if (item) {
      item.quantity = Number(item.quantity) + quantity;
      item.product_id = product.id;
      this.cartItemService.patch(item.id, item).subscribe((response) => {
        this.router.navigateByUrl('/cart');
      });
    } else {
      let item = {...product};
      item.quantity = quantity;
      item.product_id = product.id;
      delete item.id;
      this.cartItemService.post(item).subscribe((response) => {
        this.cartStateService.addItem(item);
        this.router.navigateByUrl('/cart');
      });
    }
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [slideInDownAnimation]
})
export class CartComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  products: { id: number, name: string, price: number, offer:number, quantity:number, image: string, editing: boolean }[] = [
    { id: 1, name: '5075E', price: 31850, offer:29000, quantity:1, image: 'assets/catalog/5075E.png', editing: false },
    { id: 1, name: '5090M', price: 39000, offer:35000, quantity:1, image: 'assets/catalog/5090M.png', editing: false },
    { id: 1, name: '5100R', price: 45500, offer:null, quantity:1, image: 'assets/catalog/5100R.png', editing: false }
  ];
  constructor() { }

  ngOnInit() {
  }

  getTotal() {
    let total = 0;
    this.products.forEach((product)=>{
      total += product.price;
    });
    return total;
  }
  remove(product) {
    
  }
  toggleEditing(product) {
    product.editing = !product.editing;
  }

}

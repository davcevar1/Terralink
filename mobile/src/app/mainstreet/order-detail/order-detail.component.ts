import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class OrderDetailComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  products: { id: number, name: string, price: number, offer:number, quantity:number, image: string }[] = [
    { id: 1, name: '5075E', price: 31850, offer:29000, quantity:1, image: 'assets/catalog/5075E.png' },
    { id: 1, name: '5090M', price: 39000, offer:35000, quantity:1, image: 'assets/catalog/5090M.png' },
    { id: 1, name: '5100R', price: 45500, offer:null, quantity:1, image: 'assets/catalog/5100R.png' }
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

}

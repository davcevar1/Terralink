import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {
  private cartCountSource = new BehaviorSubject<boolean>(false);
  cartCount$ = this.cartCountSource.asObservable();

  constructor() { }
  setCartCount(value) {
    this.cartCountSource.next(value);
  }
}

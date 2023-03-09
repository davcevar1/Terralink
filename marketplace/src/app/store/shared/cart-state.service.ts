import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartStateService {
  items: any[] = [];
  total: number;

  constructor() { }
  addItem(item) {
    this.items.push(item);
    this.calcTotal();
  }
  deleteItem(item) {
    this.items.splice(this.items.indexOf(item),1);
  }
  setItems(items: any[]) {
    this.items = items;
    this.calcTotal();
  }
  calcTotal() {
    let total = 0;
    this.items.forEach((item)=>{
      total += item.price * item.quantity;
    });
    this.total = total;
  }
}

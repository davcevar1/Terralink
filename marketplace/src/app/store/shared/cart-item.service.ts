import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  endpoint = `${environment.apiPath}/cart-items`;

  constructor(
    http: HttpClient
  ) { }

  delete(id: number): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    cart = cart.filter((item)=>{
      return item.id != id;
    });
    sessionStorage['cart'] = JSON.stringify(cart);
    return of(id); 
  }
  find(params?): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    return of(cart);
  }
  get(id, params?): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    let product = cart.find((item)=>{
      return item.id == id;
    }); 
    return of(product);
  }
  patch(id, data): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    cart = cart.map((item)=>{
      if (item.id == id) {
        item = Object.assign(item, data);
      }
      return item;
    }); 
    sessionStorage['cart'] = JSON.stringify(cart);
    return of(data);
  }
  post(data): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    data.id = (new Date()).getTime();
    cart.push(data);
    sessionStorage['cart'] = JSON.stringify(cart);
    return of(data);
  }
  put(id, data): Observable<any> {
    let cart = sessionStorage['cart']? JSON.parse(sessionStorage['cart']) : [];
    cart = cart.map((item)=>{
      if (item.id == id) {
        item = data;
      }
      return item;
    }); 
    sessionStorage['cart'] = JSON.stringify(cart);
    return of(data);
  }

}

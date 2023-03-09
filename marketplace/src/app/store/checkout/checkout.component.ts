import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';

import {CartItemService} from '../shared/cart-item.service';
import {CartStateService} from '../shared/cart-state.service';
import {OrderService} from '../shared/order.service';
import {OrderItemService} from '../shared/order-item.service';
import {AuthService} from '../../core/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[];
  submitted: boolean;
  paymentMethods: any[];
  checkoutForm: FormGroup;
  authorized: boolean;
  rate = 6.75;
  user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartItemService: CartItemService,
    public cartStateService: CartStateService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private authService: AuthService,
    private productService: ProductService,
    private db: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.authorized = sessionStorage.authorized;
    this.loadCartItems();
    this.paymentMethods = [
      {type: 'creditCard', name: 'Tarjeta de crédito'},
      {type: 'debit', name: 'Débito a cuenta'},
      {type: 'credit', name: 'Financiamiento'}
    ];
    this.checkoutForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      identificationType: ['1', Validators.required],
      identificationNumber: ['', Validators.required],
      email: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      phone: ['', Validators.required],
      //paymentType: ['', Validators.required],
      term: [3],
    });
    let self = this;
    window.addEventListener('message', (event) => {
      if (event.data.type == 'authorized-bank') {
        this.authorized = sessionStorage.authorized = event.data.value;
      }
    }, false);
    this.db.collection('marketplace-users').doc(localStorage.getItem('fid')).ref.get().then(response => {
      const data = response.data();
      this.user = {
        firstName: data.firstName,
        lastName: data.lastName
      };
      this.checkoutForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
    });

  }

  getADSA(amount, term, rate, paymentsPerYear = 12): number {
    return this.pmt((rate / 100) / paymentsPerYear, term, -amount) * paymentsPerYear;
  }

  linkBank() {
    let x = screen.width / 2 - 470 / 2;
    let y = screen.height / 2 - 560 / 2;
    window.open('connect', 'connect', `width=470,height=560,left=${x},top=${y}`);
  }

  loadCartItems() {
    this.cartItemService.find().subscribe((response: any) => {
      this.cartItems = response;
    });
  }

  pmt(ir, np, pv, fv = 0, type = 0): number {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    let pmt;
    let pvif;
    fv || (fv = 0);
    type || (type = 0);
    if (ir === 0) {
      return -(pv + fv) / np;
    }
    pvif = Math.pow(1 + ir, np);
    pmt = -ir * pv * (pvif + fv) / (pvif - 1);
    if (type === 1) {
      pmt /= (1 + ir);
    }
    return pmt;
  }

  submit() {
    if (this.checkoutForm.valid) {
      const configurationSource = <BehaviorSubject<any>>this.authService.configuration$.source;
      const configuration = configurationSource.value;
      const data = {
        'code': 'ORD' + (new Date()).getTime(),
        'customer_id': configuration.id,
        'totalValue': this.cartStateService.total,
        'status': 'Guardada',
        'date': new Date(),
        'products': {},
        'agency': {
          name: 'Marketplace',
          name_es: 'Marketplace'
        },
        'region': {
          name: 'Marketplace',
          name_es: 'Marketplace'
        },
        'user': 'web',
        'personalInformation': {
          'name': `${this.checkoutForm.value.firstName} ${this.checkoutForm.value.lastName}`,
          'email': this.checkoutForm.value.email,
          'phone': this.checkoutForm.value.phone,
          'dni': this.checkoutForm.value.identificationNumber
        },
        'creditInformation': {
          'monthlyPayment': Math.round(this.getADSA(this.cartStateService.total, this.checkoutForm.value.term, this.rate) / 12 * 100) / 100,
          'term': this.checkoutForm.value.term,
          'rate': this.rate
        },
        'bank': ''
      };
      this.cartItems.forEach(p => {
        data.products[p.product_id] = {quantity: p.quantity, product: p.product_id};
      });

      this.productService.getCurrentBank()
        .then(bank => data.bank = bank)
        .then(() => this.db.collection('orders').add(data))
        .then(doc => {
          if (this.checkoutForm.value.paymentMethod === 'credit') {
            this.router.navigateByUrl('/credit-request?c=' + doc.id);
          } else {
            this.router.navigateByUrl('/confirmation');
          }
        });
    }
  }
}

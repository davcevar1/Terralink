import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../core/shared/auth.service';
import { OrderService } from '../../store/shared/order.service';
import { OrderItemService } from '../../store/shared/order-item.service';
import { environment } from '../../../environments/environment';

declare var $: any;
declare var PubNub: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('confirmModal') confirmModal;
  number: string;
  order: any;
  orderItems: any[];
  subtotal: number = 0;
  taxes: number = 0;
  total: number = 0;
  confirmForm: FormGroup;
  submitting: boolean;
  sendEmailSuccess: boolean;
  pubnub: any;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.number = this.route.snapshot.paramMap.get('number');
    this.pubnub = new PubNub({
      publishKey: 'pub-c-bde32703-9d7e-400c-9bfe-b3623c91a29d',
      subscribeKey: 'sub-c-95ec11ae-382d-11e8-a6a1-9a016222f7eb'
    });
    this.pubnub.addListener({
      message: (m) => {
        if (this.order.id == m.message.id) {
          this.loadData();
        }
        console.log(m.message);
      }
    });
    this.pubnub.subscribe({ channels: ['events-channel'], triggerEvents: ['message', 'status'] });
    this.confirmForm = this.formBuilder.group({
      pin: ['', Validators.required]
    });
    this.loadData();
  }
  loadData() {
    this.orderService.find({ number: this.number }).subscribe((order: any[]) => this.order = order[0]);
    this.orderItemService.find({ order_number: this.number }).subscribe((orderItems: any[]) => {
      this.orderItems = orderItems;
      orderItems.forEach((orderItem) => {
        let itemTotal = orderItem.quantity * (orderItem.offer || orderItem.price);
        let itemSubtotal = itemTotal / 1.12;
        this.subtotal += itemTotal / 1.12;
        this.taxes += itemTotal - itemSubtotal;
        this.total += itemTotal;
      });
    });
  }
  openPin(content) {
    this.modalService.open(content, { size: 'sm', centered: true }).result.then((result) => {
      if (result=='authorized') {
        this.setStatus('approved', false);
      }
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }
  setStatus(value, redirect: boolean=true) {
    this.order.status = value;
    this.orderService.patch(this.order.id, this.order).subscribe(() => {
      this.pubnub.publish({ channel: 'events-channel', message: this.order });
    });
    if (redirect) {
      this.router.navigateByUrl('/orders');
    }
  }
}

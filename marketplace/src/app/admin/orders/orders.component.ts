import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService } from '../../core/shared/auth.service';
import { OrderService } from '../../store/shared/order.service';
import { SellerService } from '../shared/seller.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[];
  sellers: any[];
  statuses: any[];

  constructor(
    public auth: AuthService,
    private orderService: OrderService,
    private sellerService: SellerService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.auth.configuration$.subscribe((response:any)=>{
      if (response) {
        let data = response.role.id=='ROLE_STORE'? {customer_id:response.id} : null;
        this.orderService.find(data).subscribe((response:any)=>{
          this.orders = response;
        });
      }
    });
    this.sellerService.find().subscribe((sellers: any[])=>{
      this.sellers = sellers;
    });
    this.statuses = [
      {label:"Creada"},
      {label:"Aprobada"},
      {label:"Despachada"},
      {label:"Entregada"}
    ];
  }

}

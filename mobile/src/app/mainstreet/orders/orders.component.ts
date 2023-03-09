import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [slideInDownAnimation]
})
export class OrdersComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  orders = [
    {number:'001-435349', name:'José Martinez', total: 23456, status: 'Enviada'},
    {number:'001-435348', name:'Marco Aguayo', total: 43456, status: 'Enviada'},
    {number:'001-435347', name:'Miguel Sandoval', total: 23487, status: 'Enviada'},
    {number:'001-435346', name:'Julio Benitez', total: 23098, status: 'Enviada'},
    {number:'001-435345', name:'María Altamirano', total: 87654, status: 'Enviada'},
    {number:'001-435344', name:'José Martinez', total: 23456, status: 'Enviada'},
    {number:'001-435343', name:'Marco Aguayo', total: 43456, status: 'Enviada'},
    {number:'001-435342', name:'Miguel Sandoval', total: 23487, status: 'Enviada'},
    {number:'001-435341', name:'Julio Benitez', total: 23098, status: 'Enviada'},
    {number:'001-435340', name:'María Altamirano', total: 87654, status: 'Enviada'}
  ];
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [slideInDownAnimation]
})
export class ProductComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  product = { id: 1, name: '5075E', price: 31850, image: 'assets/catalog/5075E.png' };

  constructor() { }

  ngOnInit() {
  }

}

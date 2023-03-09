import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  host: { 'class': 'card' }
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

}

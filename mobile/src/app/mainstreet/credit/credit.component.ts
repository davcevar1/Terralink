import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css'],
  animations: [slideInDownAnimation]
})
export class CreditComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  constructor() { }

  ngOnInit() {
  }

}

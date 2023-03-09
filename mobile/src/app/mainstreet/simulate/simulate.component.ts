import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.scss'],
  animations: [slideInDownAnimation]
})
export class SimulateComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  model;
  constructor() { }

  ngOnInit() {
  }

}

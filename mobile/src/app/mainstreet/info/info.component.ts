import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [slideInDownAnimation]
})
export class InfoComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  constructor() { }

  ngOnInit() {
  }

}

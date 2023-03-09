import { Component, OnInit, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInDownAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Inicio');
  }

}

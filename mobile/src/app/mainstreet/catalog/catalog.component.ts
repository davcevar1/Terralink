import { Component, OnInit, HostBinding } from '@angular/core';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [slideInDownAnimation]
})
export class CatalogComponent implements OnInit {
  @HostBinding('@routeAnimation')
  routeAnimation = true;
  categories: { id: number, name: string }[] = [
    { id: 1, name: 'Agricultura' },
    { id: 2, name: 'Cesped y jardín' },
    { id: 3, name: 'Cuidados del paisaje y del terreno' },
    { id: 4, name: 'Golf y Deportes' },
    { id: 5, name: 'Máquinas Forestales' },
    { id: 6, name: 'Motores y Transmisiones' },
    { id: 7, name: 'Repuestos' },
    { id: 8, name: 'Powergard' }
  ];
  products: { id: number, name: string, price: number, offer:number, image: string }[] = [
    { id: 1, name: '5075E', price: 31850, offer:29000, image: 'assets/catalog/5075E.png' },
    { id: 1, name: '5090M', price: 39000, offer:35000, image: 'assets/catalog/5090M.png' },
    { id: 1, name: '5100R', price: 45500, offer:null, image: 'assets/catalog/5100R.png' },
    { id: 1, name: '5090GF', price: 34700, offer:null, image: 'assets/catalog/5090GF.png' },
    { id: 1, name: '5090GN', price: 35700, offer:null, image: 'assets/catalog/5090GN.png' },
    { id: 1, name: '5090GV', price: 35200, offer:null, image: 'assets/catalog/5090GV.png' }
  ];
  currentCategory;
  constructor() { }

  ngOnInit() {
  }
  setCategory(category) {
    this.currentCategory = category;
  }
}

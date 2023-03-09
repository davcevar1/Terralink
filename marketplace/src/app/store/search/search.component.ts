import {Component, OnInit} from '@angular/core';

import {ProductService} from '../shared/product.service';
import {TermService} from '../shared/term.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  currentCategory: any;
  categories: any[];
  products: any[];

  constructor(
    private productService: ProductService,
    private termService: TermService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currentCategory = '';
    this.route.params.switchMap(value => this.productService.findByCompany(value['cs']))
      .subscribe((products: any) => {
        this.products = products;
      });
    this.route.params.switchMap(value => this.termService.getByCompany(value['cs']))
      .subscribe((category: any) => {
        this.currentCategory = category;
      });
  }

}

import {Component, OnInit} from '@angular/core';

import {ProductService} from '../shared/product.service';
import {BrandService} from '../shared/brand.service';
import {BannerService} from '../shared/banner.service';
import {TermService} from '../shared/term.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  brands: any[];
  categories: any[];
  featured: any[];
  offers: any[];
  arrived: any[];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private bannerService: BannerService,
    private termService: TermService
  ) {
  }

  ngOnInit() {
    this.brandService.find().subscribe((response: any) => {
      this.brands = response;
    });
    this.bannerService.find().subscribe((response: any) => {
      this.featured = response;
    });
    this.productService.find().subscribe((response: any) => {
      this.offers = [];
      this.arrived = [];
      response.forEach(p => Math.random() > 0.5 ? this.offers.push(p) : this.arrived.push(p));
    });
    this.termService.find().subscribe((response: any) => {
      this.categories = response.filter(c => c.slug === 'Walmart');
    });
  }

}

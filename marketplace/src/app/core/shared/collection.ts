import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

import { Action } from '../models/action';
import { RestCrud } from './rest-crud';

export abstract class Collection implements OnInit {
  public actions: Action[];
  public params: any = {
    page: 1,
    limit: 25
  };
  public collection$: Observable<any>;
  public route: ActivatedRoute;
  public entityService: RestCrud

  constructor(
    route: ActivatedRoute,
    entityService: RestCrud
  ) {
    this.route = route;
    this.entityService = entityService;
  }

  ngOnInit() {
    this.createActions();
    this.loadCollection();
  }
  add() {

  }
  createActions() {
    this.actions = [
      {
        label: 'Add',
        icon: 'plus',
        click: ()=>{
          this.add();
        }
      },
      {
        label: 'Search',
        icon: 'search',
        click: ()=>{
          this.search();
        }
      },
      {
        id: 'menu',
        icon: 'ellipsis-vertical',
        children: [
          {
            label: 'Refresh',
            click: ()=>{
              this.find();
            }
          }
        ]
      }
    ];
  }
  delete() {

  }
  find(params?) {
    this.params = this.params || params;
    this.collection$ = this.entityService.find(params? params : this.params).pipe(
      share()
    );
  }
  loadCollection() {
    this.collection$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.entityService.find(this.params);
      }),
      share()
    );
  }
  public next(event?) {
    this.params.page++;

  }
  search() {

  }
}

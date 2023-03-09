import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

import { Action } from '../models/action';
import { RestCrud } from './rest-crud';

export abstract class Entity implements OnInit {
  public actions: Action[];
  public entity$: Observable<any>;
  public entityForm: FormGroup;
  public entityService: any;
  public formBuilder: FormBuilder;
  public id: string;
  public route: ActivatedRoute;

  constructor(
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    entityService: any
  ) {
    this.route = route;
    this.formBuilder = formBuilder;
    this.entityService = entityService;
  }

  ngOnInit() {
    this.createActions();
    this.createForm();
    this.loadEntity();
  }
  createActions() {
    this.actions = [
      {
        label: 'Save',
        icon: 'check',
        click: () => {
          this.submit();
        }
      },
      {
        icon: 'ellipsis-vertical',
        children: [
          {
            label: 'Information',
            click: () => {
              //TODO
            }
          }
        ]
      }
    ];
  }
  createForm() {
    this.entityForm = this.formBuilder.group({});
  }
  loadEntity() {
    this.entity$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.entityService.get(params.get('id')).pipe(
          map((entity: any)=>{
            this.id = entity.id;
            this.patchForm(entity);
            return entity;
          })
        );
      }),
      share()
    );
  }
  mapData(data: any) {
    return data;
  }
  patchForm(entity: any) {
    if (this.entityForm) {
      this.entityForm.patchValue(entity);
    }
  }
  submit() {
    if (this.entityForm && this.entityForm.valid) {
      this.entityService.patch(this.id, this.mapData(this.entityForm.value)).subscribe((entity: any)=>{
        debugger;
      }, (error:any)=>{
        alert(error.message);
      });
    }
  }
}

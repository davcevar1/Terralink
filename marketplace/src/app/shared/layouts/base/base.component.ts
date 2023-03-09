import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService } from '../../../core/shared/auth.service';
import { CartItemService } from '../../../store/shared/cart-item.service';
import { CartStateService } from '../../../store/shared/cart-state.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'layout-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  submitting: boolean;
  menus: any[];

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cartItemService: CartItemService,
    public cartStateService: CartStateService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
    this.cartItemService.find().subscribe((response:any)=>{
      this.cartStateService.setItems(response);
    });
  }
  login(): void {
    this.error = null;
    if (this.loginForm.valid) {
      this.submitting = true;
      this.auth.login(this.loginForm.value)
        .subscribe(
        token => {
          
        },
        err => {
          this.submitting = false;
          this.error = err.error.error_description || err.message || 'Unexpected error';
        }
        );
    }
  }
}

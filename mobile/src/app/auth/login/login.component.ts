import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../shared/auth.service';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInDownAnimation]
})
export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  model: any = {};
  error: string;
  submitting: boolean;
  constructor(private titleService: Title, private auth: AuthService, private router: Router) {}
  ngOnInit() {
    this.titleService.setTitle('Login');
  }
  login(): void {
    this.error = null;
    this.submitting = true;
    this.router.navigateByUrl('/orders');
    /*
    this.auth.login(this.model)
      .subscribe(
        token => {
          this.router.navigateByUrl('/');
        },
        err => {
          this.submitting = false;
          this.error = err.error.error_description || err.message || 'Unexpected error';
        }
      );
    */
  }
}

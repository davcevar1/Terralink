import {Component, OnInit, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {AuthService} from '../shared/auth.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../core/shared/user.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  submitting: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  passwordType: string = 'password';
  url: string;

  constructor(
    private title: Title,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private db: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.url = this.route.snapshot.queryParamMap.get('url');
  }

  submitLogin(): void {
    this.error = null;
    if (this.loginForm.valid) {
      this.submitting = true;
      this.auth.login(this.loginForm.value)
        .subscribe(
          token => {
            this.router.navigateByUrl(this.url ? this.url : '/');
          },
          err => {
            this.submitting = false;
            this.error = err.error.error_description || err.message || 'Unexpected error';
          }
        );
    }
  }

  submitRegister(): void {
    this.error = null;
    if (this.registerForm.valid) {
      this.submitting = true;
      let data = this.registerForm.value;
      data.role = {
        'id': 'ROLE_STORE',
        'name': 'Tienda'
      };
      this.db.collection('marketplace-users').add(data).then((response: any) => {
        this.auth.setToken(this.registerForm.value.username, response.id, response.data().firstName, response.data().lastName);
        this.auth.checkAuth();
        this.submitting = false;
        this.router.navigateByUrl(this.url ? this.url : '/');
      });
    }
  }

  togglePasswordType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}

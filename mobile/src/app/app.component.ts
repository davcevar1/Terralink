import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Title } from '@angular/platform-browser';

import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  loggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.loggedIn$ = this.auth.loggedIn$;
  }
}

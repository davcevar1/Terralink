import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { environment } from '../environments/environment';
import { AuthService } from './core/shared/auth.service';
import { LayoutService } from './core/shared/layout.service';

declare var PubNub: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.logged-in')
  loggedIn: boolean;
  menus: any[] = [
    {label: "Términos y condiciones"},
    {label: "Blog"},
    {label: "Contáctanos"}
  ];
  pubnub;

  constructor(
    private title: Title,
    private auth: AuthService,
    private layout: LayoutService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.title.setTitle('App');
  }
}

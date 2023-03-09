import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Error } from '../models/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error: Error;

  constructor(
    private title: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.data) {
      this.route.data.subscribe((value: Error)=>{
        this.error = value;
        this.title.setTitle(this.error.title);
      });
    }
  }

}

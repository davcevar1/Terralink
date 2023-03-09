import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  pinRequested: boolean;
  selected: boolean;

  constructor() { }

  ngOnInit() {
  }
  authorize() {
    window.opener.postMessage({type:"authorized-bank", value:1}, "*");
    window.close();
  }
  requestPin() {
    this.pinRequested = true;
  }
  selectBank() {
    this.selected = true;
  }
}

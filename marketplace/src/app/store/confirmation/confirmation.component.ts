import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  type: string;
  label: string;
  success: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.queryParamMap.get('t');
    if (this.type=='credit') {
      setTimeout(()=>this.label = 'Validating identity...', 1000);
      setTimeout(()=>this.label = 'Validating credit...', 3000);
      setTimeout(()=>this.label = 'Validating rules...', 6000);
      setTimeout(()=>{
        this.success = true;
        this.label = 'Successfully your order is approved';
      }, 8000);
    }
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from './layout.service';
import { UtilsService } from './utils.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  providers: [
    LayoutService,
    UtilsService
  ]
})
export class SharedModule { }

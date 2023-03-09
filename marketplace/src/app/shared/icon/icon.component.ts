import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  collection: string;
  libraryUrl: string = 'assets/factoricons-regular.svg';

  constructor() { }

  ngOnInit() {
    if (this.collection) {
      this.libraryUrl = `assets/${this.collection}.svg`;
    }
  }
}

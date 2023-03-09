import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showSidebarSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showSidebar$: Observable<boolean> = this.showSidebarSource.asObservable();

  constructor() { }

  showSidebar(value) {
    this.showSidebarSource.next(value);
  }
}

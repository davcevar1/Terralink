import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }
  removeEmptyProperties(data) {
    return Object.keys(data).forEach((key) => (data[key] == null || data[key] == '' || data[key] == 'undefined') && delete data[key]);
  }
}

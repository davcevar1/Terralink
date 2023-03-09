import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestCrud } from '../../core/shared/rest-crud';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends RestCrud {
  endpoint = `${environment.apiPath}/order-items`;

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

}

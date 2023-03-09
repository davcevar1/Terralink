import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestCrud } from '../../core/shared/rest-crud';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends RestCrud {
  endpoint = `${environment.apiPath}/brands`;

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class RestCrud {

  protected endpoint;
  protected http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
  }

  delete(id: number): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete(url);
  }
  find(params?): Observable<any> {
    const url = `${this.endpoint}`;
    return this.http.get(url, {params: params});
  }
  get(id, params?): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.http.get(url, {params: params});
  }
  patch(id, data): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.http.patch(url, data);
  }
  post(data): Observable<any> {
    return this.http.post(this.endpoint, data);
  }
  put(id, data): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.http.put(url, data);
  }

}

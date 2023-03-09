import {Injectable} from '@angular/core';

import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Observable, from} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public bank: string;
  companies: Array<string>;

  constructor(private db: AngularFirestore) {
  }

  getCurrentBank() {
    if (this.bank) {
      return new Promise<string>((resolve) => resolve(this.bank));
    }
    return this.db.collection('bank').doc('current').ref.get().then(doc => {
      const data = doc.data();
      this.bank = data.name;
      return data.name;
    });
  }

  getCompaniesByBank() {
    if (this.companies) {
      return new Promise<Array<string>>((resolve) => resolve(this.companies));
    }
    return this.getCurrentBank()
      .then(bank => this.db.collection('companies').ref.where('bank', '==', bank).get())
      .then((query: any) => {
        this.companies = [];
        query.forEach(doc => {
          this.companies.push(doc.id);
        });
        return this.companies;
      });
  }

  get(id: string) {
    return from(this.db.collection('products').doc(id).ref.get().then(doc => {
      return this.mapResponse(doc);
    }));
  }

  find(): Observable<any> {
    return from(this.getCompaniesByBank()
      .then(companies => {
        const ref = this.db.collection('products').ref.where('company', '==', 'Walmart');
        // companies.forEach(c => ref.where('company', '==', c));
        return ref.get();
      })
      .then((query: any) => {
        const products = [];
        query.forEach(doc => products.push(this.mapResponse(doc)));
        return products;
      }));

  }

  findByCompany(id: string) {
    return from(this.db.collection('products').ref.where('company', '==', id)
      .get().then((query: any) => {
        const products = [];
        query.forEach(doc => products.push(this.mapResponse(doc)));
        return products;
      }));
  }

  mapResponse(doc: any): any {
    const product = doc.data();
    return {
      name: product.name,
      listPrice: product.price,
      price: product.price,
      image: product.image.url,
      quantity: Math.floor(Math.random() * 100),
      product_id: 12,
      order_number: '001-1533308869095',
      features: product.features,
      description: product.description,
      id: doc.id
    };
  }
}

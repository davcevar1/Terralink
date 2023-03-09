import {Injectable} from '@angular/core';

import {from, Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private db: AngularFirestore) {
  }

  find(): Observable<any> {
    return this.db.collection('categories').snapshotChanges().pipe(flatMap(query => {
      const categories = {};
      query.forEach((doc: any) => categories[doc.payload.doc.id] = doc.payload.doc.data().name);
      return this.db.collection('companies').snapshotChanges().pipe(map(queryComp => {
        return queryComp.map(doc => {
          const company: any = doc.payload.doc.data();
          return {
            id: company.category,
            name: categories[company.category],
            slug: doc.payload.doc.id
          };
        });
      }));
    }));
  }

  getByCompany(id: string): Observable<any> {
    return from(this.db.collection('companies').doc(id).ref.get().then((doc: any) => {
      return this.db.collection('categories').doc(doc.data().category).ref.get().then(docCategory => ({
        id: docCategory.id,
        name: docCategory.data().name,
        slug: docCategory.id
      }));
    }));
  }
}

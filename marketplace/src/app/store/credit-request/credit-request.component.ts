import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';

import { CartStateService } from '../shared/cart-state.service';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponent implements OnInit {
  creditRequestForm: FormGroup;
  submitted: false;
  catalog: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    public cartStateService: CartStateService
  ) {
  }

  ngOnInit() {
    this.creditRequestForm = this.formBuilder.group({
      birthdate: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      housing: ['', Validators.required],
      familyResponsibilities: ['', Validators.required],
      academicLevel: ['', Validators.required],
      currentActivity: ['', Validators.required],
      currentCompany: ['', Validators.required],
      currentLaborYears: ['', Validators.required],
      previousActivity: ['', Validators.required],
      previousCompany: ['', Validators.required],
      previousLaborYears: ['', Validators.required]
    });
    this.getCatalogs();
  }

  getCatalogs() {
    /*const culture = "es";*/
    this.db.collection('catalogs').doc('main').ref.get().then(response => {
      const catalog = response.data();
      Object.keys(catalog).forEach(function (key) {
        const ids = Object.keys(catalog[key]);
        catalog[key].values = [];
        ids.forEach(function (id) {
          catalog[key].values.push({
            code: id,
            value: catalog[key][id].name /*(culture === "en") ? catalog[key][id].name : catalog[key][id].name_es*/
          });
        });
      });
      this.catalog = catalog;
    });
  }

  submit() {
    const id = this.route.snapshot.queryParamMap.get('c');
    const ref = this.db.collection('orders').doc(id).ref;
    delete sessionStorage.cart;
    this.cartStateService.setItems([]);
    ref.get()
      .then(doc => {
        const order = doc.data();
        Object.keys(this.creditRequestForm.value).forEach(key => order.personalInformation[key] = this.creditRequestForm.value[key]);
        order.status = 'Enviada';
        return ref.update(order);
      })
      .then(() => this.router.navigateByUrl('/confirmation?t=credit'));
  }
}

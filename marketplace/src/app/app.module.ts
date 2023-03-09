import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from './core/core.module';
import {AdminModule} from './admin/admin.module';
import {StoreModule} from './store/store.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';

import {environment} from '../environments/environment.firebase';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppLoadService} from './app.load.service';

export function init_app(service: AppLoadService) {
  return () => service.loginFirebase();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    StoreModule,
    RouterModule.forRoot([]),
    NgbModule.forRoot(),
    InputsModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AppLoadService, {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

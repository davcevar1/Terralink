import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AppLoadService {

  constructor(private fb: AngularFireAuth) {
  }

  loginFirebase(): Promise<any> {
    return this.fb.auth.signInWithEmailAndPassword('demo@gmail.com', 'demo123');
  }
}

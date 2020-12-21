import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router) {
      this.angularFireAuth.authState.subscribe((auth => {
        this.authState = auth;
      }))
     }

  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
}

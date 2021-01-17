import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = [];

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router) {
      this.angularFireAuth.authState.subscribe((auth => {
        this.authState = auth;
      }))
     }

  get anonymousUser(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    let currentUser = '';
    if ((this.authState != undefined) && (this.authState != null)){
      currentUser = this.authState['email'];
    }
    else
      currentUser = '';

    return currentUser;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.anonymousUser))
      return true;
    else
      return false;
  }

  async registerWithEmail(email: string, password: string) {
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email: string, password: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): void {
    this.angularFireAuth.signOut();
    this.router.navigate(['login']);
  }

}

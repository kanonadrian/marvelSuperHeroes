import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;
  public identity;

  constructor(
      private angularFireAuth: AngularFireAuth
      ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  async SignUp(emailRegister: string, passwordRegister: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(emailRegister, passwordRegister); 
  }

  /* Sign in */
  async SignIn(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }  
  GetIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

}
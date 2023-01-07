import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  Signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      return 'success';
    }).catch((error) => {
      return error.error;
    });
  }

  SignUpWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return firebase.auth().signInWithPopup(provider);
  }

  async LoginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return firebase.auth().signInWithPopup(provider).then((result) => {
      return 'success';
    });
  }

  async Login(email: string, password: string): Promise<string> {
    let success = 'wait';
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      return 'success';
    }).catch((error) => {
      return error.error;
    });
    return success;
  }

  Logout() {
    return firebase.auth().signOut();
  }


}

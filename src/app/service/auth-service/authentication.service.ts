import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  keyvalue = '';
  // apiHeader = 'http://localhost:3000/';
  apiHeader = 'https://us-central1-helpinghand-90a6a.cloudfunctions.net/apis/';

  user = new BehaviorSubject({});
  post = new BehaviorSubject({});
  constructor(private http: HttpClient, private router: Router) {

  }
  register(objR) {
    // send data to the backend server\
    this.http.post(this.apiHeader + 'register', objR)
      .subscribe(data => {
        this.router.navigate(['/login']);
      });
  }

  login(objR) {
    // send data to the backend server\
    this.http.post(this.apiHeader + 'login', objR).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.user.next(res.data);
        if (res.data.acountType == 'Identifier') {
          this.router.navigate(['/home']);
        }
        else if (res.data.acountType == 'motivator') {
          this.router.navigate(['/motivator']);
        }
        else if (res.data.acountType == 'donor') {
          this.router.navigate(['/donor']);
        }
      }
    });
  }

  facebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        let user = result.user;
        let userBody = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL,
          uid: user.uid,
        }

        this.http.post(this.apiHeader + '/social', userBody)
          .subscribe((data) => {
            localStorage.setItem('userMeta', JSON.stringify(data));
            this.router.navigate(['/']);
          });
      }).catch((error: any) => {
        console.log(error);
      });
  }

  google() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        let user = result.user;
        console.log(user);
        let userBody = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL,
          uid: user.uid,
        }

        this.http.post(this.apiHeader + '/social', userBody)
          .subscribe((data) => {
            localStorage.setItem('userMeta', JSON.stringify(data));
            this.router.navigate(['/']);
          });
      }).catch((error: any) => {
        console.log(error);
      });
  }

  home(objR) {
    return this.http.post(this.apiHeader + 'home', objR);
  }
  getquestion(key: any) {
    return this.http.get(this.apiHeader + '/question/' + key);
  }

  forgetpassword(objR) {
    this.http.post(this.apiHeader + 'forgetpassword', objR).subscribe((data: any) => {
      this.router.navigate(['/login']);
    });
  }
  getMarriage() {
    return this.http.get(this.apiHeader + 'marriage');
  }
  getdonations(objR) {
    this.http.post(this.apiHeader + 'home/donations', objR).subscribe((data: any) => {
      this.router.navigate(['/home']);
    });
  }

  getgetdonations() {
    return this.http.get(this.apiHeader + 'donors');
  }

  getPosts() {
    return this.http.get(this.apiHeader + 'posts');
  }

  getEducation() {
    return this.http.get(this.apiHeader + 'education');
  }
  getUsers() {
    return this.http.get(this.apiHeader + 'Users');
  }
  getProverty() {
    return this.http.get(this.apiHeader + 'proverty');
  }
  getWomen() {
    return this.http.get(this.apiHeader + 'women');
  }
  getChild() {
    return this.http.get(this.apiHeader + 'child');
  }
  getEmployment() {
    return this.http.get(this.apiHeader + 'employment');
  }
  getOthers() {
    return this.http.get(this.apiHeader + 'others');
  }
  getLastPosts() {
    return this.http.get(this.apiHeader + 'LastPosts');
  }



}

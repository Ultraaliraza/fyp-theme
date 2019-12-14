import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  getcomment(value: any) {
    throw new Error("Method not implemented.");
  }
  keyvalue = '';
  apiHeader = 'http://localhost:3000/';
  // apiHeader = 'https://us-central1-helpinghand-90a6a.cloudfunctions.net/apis/';
  // apiHeader = 'http://localhost:5000/helpinghand-90a6a/us-central1/apis/';

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
    this.http.post(this.apiHeader + 'login', objR)
      .subscribe((res: any) => {
        console.log(res);

        localStorage.setItem('userMeta', res.uid);
        this.user.next(res.data);
        this.checkAccountType(res.data.accountType);
      });
  }

  facebook() {
    return firebase.auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result: any) => {
        let user = result.user;
        let userBody = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          profile_image: user.photoURL,
          uid: user.uid

        }

        this.http.post(this.apiHeader + 'social', userBody)
          .subscribe((res: any) => {
            localStorage.setItem('userMeta', user.uid);
            this.user.next(res.data);
            this.checkAccountType(res.data.accountType);
          });
      }).catch((error: any) => {
        console.log(error);
      });
  }

  google() {
    return firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result: any) => {
        let user = result.user;
        let userBody = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          profile_image: user.photoURL,
          uid: user.uid
        }

        this.http.post(this.apiHeader + 'social', userBody)
          .subscribe((res: any) => {
            console.log(userBody.uid);
            localStorage.setItem('userMeta', userBody.uid);
            this.user.next(res.data);
            this.checkAccountType(res.data.accountType);
          });
      }).catch((error: any) => {
        console.log(error);
      });
  }

  checkAccountType(accountType: string) {
    console.log(accountType);
    if (accountType) {
      if (accountType == 'identifier' || accountType == 'Identifier') {
        return   this.router.navigate(['/home']);
      }
      else if (accountType == 'motivator' || accountType == 'Motivator') {
       return this.router.navigate(['/motivator']);
      }
      else if (accountType == 'donor' || accountType == 'Donor') {
       return this.router.navigate(['/donor']);
      }
    }
    else {
     return this.router.navigate(['/set-account-type']);
    }
  }

  setAccountType(accountType: string, userID: string) {
    return this.http.post(this.apiHeader + 'setAccountType', { acountType: accountType, id: userID });
  }

  home(objR) {
    return this.http.post(this.apiHeader + 'home', objR);
  }

  comment(objR) {
    return this.http.post(this.apiHeader + 'comments', objR);

  }

  getquestion(key: any) {
    return this.http.get(this.apiHeader + 'question/' + key);
  }

  getprofile(key: any) {
    return this.http.get(this.apiHeader + 'profile/' + key);
  }

  forgetpassword(objR) {
    this.http.post(this.apiHeader + 'forgetpassword', objR).subscribe((data: any) => {
      this.router.navigate(['/login']);
    });
  }

  updatePassword(password: object) {
    return this.http.post(this.apiHeader + 'updatepass', password);
  }

  getMarriage() {
    return this.http.get(this.apiHeader + 'marriage');
  }

  getdonations(objR) {
     return this.http.post(this.apiHeader + 'home/donations', objR);
  }

  Report(objR) {

    return this.http.post(this.apiHeader + 'question/report', objR);


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

  Updatesettings(objR) {
    return this.http.post(this.apiHeader + 'updateprofile/', objR);


  }

  getUserquestion(id: any) {
    return this.http.get(this.apiHeader + 'getallquestion/' + id);
  }
  Editpost(objR) {
    return this.http.get(this.apiHeader + 'updatequestion', objR);
  }
  getVideos() {
    return this.http.get(this.apiHeader + 'videos');
  }
  Videos(objR) {
    return this.http.post(this.apiHeader + 'postvideo', objR)
  }
  getUser(){
    const id = localStorage.getItem( 'userMeta');
    return this.http.get(this.apiHeader + 'getuserinfo/'+id  ).subscribe((data: any) => {
      
       this.user.next(data);

    });
  }
}

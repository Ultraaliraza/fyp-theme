import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  keyvalue = '';
  server = 'http://localhost:3000';

  user = new BehaviorSubject({});
  post = new BehaviorSubject({});
  constructor(private http: HttpClient, private router: Router) {

  }
  register(objR) {
    console.log('Object Received is ', objR);
    // send data to the backend server\
    this.http.post('http://localhost:3000/register', objR).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }
  login(objR) {
    console.log('Object Received is ', objR);
    // send data to the backend server\
    this.http.post('http://localhost:3000/login', objR).subscribe((res: any) => {
      console.log(res);

      if (res.success === 1) {
        this.user.next(res.data);
        if (res.data.accountType === 'Identifier') {
          this.router.navigate(['/home']);
        }
        else if (res.data.accountType === 'motivator') {
          this.router.navigate(['/motivator']);
        }
        else if (res.data.accountType === 'donor') {
          this.router.navigate(['/donor']);
        }
      } else {
        console.log('login fail');


      }

      console.log(res.data);
    });
  }

  home(objR) {
    console.log('Object Received is', objR);
    return this.http.post('http://localhost:3000/home', objR);


  }
  getquestion(key: any) {

    console.log('this.keyvalue', key);
    return this.http.get(this.server + '/question/' + key);
  }

  forgetpassword(objR) {

    console.log('Object Recieved is', objR);

    this.http.post('http://localhost:3000/forgetpassword', objR).subscribe((data: any) => {

      this.router.navigate(['/login']);

    });
  }
  getMarriage() {
    return this.http.get('http://localhost:3000/marriage');
  }
  getdonations(objR) {
    this.http.post('http://localhost:3000/home/donations', objR).subscribe((data: any) => {
      this.router.navigate(['/home']);
    });
  }

  getgetdonations() {

    return this.http.get('http://localhost:3000/donors');

  }

  getPosts() {
    return this.http.get('http://localhost:3000/posts');
  }

  getEducation() {

    return this.http.get('http://localhost:3000/education');
  }
  getUsers() {
    return this.http.get('http://localhost:3000/Users');
  }
  getProverty() {

    return this.http.get('http://localhost:3000/proverty');
  }
  getWomen() {

    return this.http.get('http://localhost:3000/women');
  }
  getChild() {

    return this.http.get('http://localhost:3000/child');
  }

  getEmployment() {

    return this.http.get('http://localhost:3000/Pemployment');
  }
  getOthers() {
    return this.http.get('http://localhost:3000/others');

  }
  getLastPosts(){
    return this.http.get('http://localhost:3000/LastPosts');
  }

 

}

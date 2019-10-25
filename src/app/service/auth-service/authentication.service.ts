import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject({});
  constructor(private http: HttpClient, private router: Router) { }
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
    this.http.post('http://localhost:3000/login', objR).subscribe((data: any) => {
      console.log(data);

      if (data.success === 1) {
        console.log('login successs');
        this.user.next({isLogin: true , res: data });
        localStorage.setItem('isLogin', 'true');
        this.router.navigate(['/home']);

      } else {
        console.log('login fail');


      }
      // this.router.navigate(['/dashboard']);
    });
  }

  home(objR) {
    console.log('Object Received is', objR);

    this.http.post('http://localhost:5000/home', objR).subscribe((data: any) => {
      console.log(data);

      this.router.navigate(['/home']);
    });


  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
      console.log(data);ing

      if (data.success === 1) {
        console.log('login successs');
        this.router.navigate(['/home']);

      } else {
        console.log('login fail');


      }
      // this.router.navigate(['/dashboard']);
    });
  }
}

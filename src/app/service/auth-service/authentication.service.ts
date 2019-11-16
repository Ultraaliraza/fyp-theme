import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject({});
  post = new BehaviorSubject({});
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
    this.http.post('http://localhost:3000/login', objR).subscribe((res: any) => {
      console.log(res);

      if (res.success === 1) {
        this.user.next(res.data);
        if(res.data.accountType ==='Identifier')
        {
        this.router.navigate(['/home']);
        }
       else if (res.data.accountType==='motivator')
       {
         this.router.navigate(['/forgetpassword']);
       }
       else if (res.data.accountType==='volunteer')
       {
         this.router.navigate(['/forgetpassword']);
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

  forgetpassword(objR){

    console.log('Object Recieved is', objR);

    this.http.post('http://localhost:3000/forgetpassword', objR).subscribe((data: any) => {

    this.router.navigate(['/login']);

    });
  }

}

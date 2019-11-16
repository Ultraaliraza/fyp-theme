import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  datePipe = new DatePipe('en-US');

  myhomeform: FormGroup;
  user;
 post;
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder , private router : Router) {
  }
  ngOnInit() {
    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.myhomeform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Catagory: new FormControl('education'),
        date: new FormControl(),
        name: new FormControl(this.user.name),
        accountType: new FormControl(this.user.accountType),
        PostBy: new FormControl(this.user.key),
      });
    });
  }


  submitFrom() {
    console.log(this.myhomeform);
    const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    this.myhomeform.controls.date.setValue(time);
    this.authService.home(this.myhomeform.value).subscribe((data: any) => {
      console.log(data);

      this.router.navigate(['/home']);
    });;

  }

}


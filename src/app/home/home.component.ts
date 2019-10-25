import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  myhomeform: FormGroup;
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder ) { }
  ngOnInit() {
    this.myhomeform = new FormGroup({
      Title: new FormControl(''),
      Description: new FormControl(''),
      Catagory: new FormControl('education'),
      date: new FormControl()
    });

  }
  submitFrom() {
    console.log(this.myhomeform);
    const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    this.myhomeform.controls.date.setValue(time);
    this.authService.home(this.myhomeform.value);

  }

}


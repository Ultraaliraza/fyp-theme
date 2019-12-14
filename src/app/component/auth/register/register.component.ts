import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myreactiveform: FormGroup;
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.myreactiveform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      accountType: new FormControl(''),
      // tslint:disable-next-line:max-line-length
      profile_image: new FormControl('https://firebasestorage.googleapis.com/v0/b/helpinghand-90a6a.appspot.com/o/Profile_Images%2Fuser-icon-image-placeholder-300-grey.jpg?alt=media&token=02ca32a9-52c7-4278-89a7-f89255a8298f')
    });

  }
  get form() {
    return this.myreactiveform.controls;
  }
  submitFrom() {
    this.authService.register(this.myreactiveform.value);
  }

  facebook() {
    this.authService.facebook();
  }

  google() {
    this.authService.google();
  }


}
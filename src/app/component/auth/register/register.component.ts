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
      accountType: new FormControl('identifier'),
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
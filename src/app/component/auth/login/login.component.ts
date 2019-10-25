import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',],
      password: ['',],
    });
  }
  submitFrom() {
    console.log(this.myForm.value);
    this.authService.login(this.myForm.value);
  }
}
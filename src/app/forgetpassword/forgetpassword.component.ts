import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  ForgetForm: FormGroup;
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.ForgetForm = new FormGroup({
      email: new FormControl('')
    });
  }

  PasswordReset() {
    this.authService.forgetpassword(this.ForgetForm.value);

  }
}

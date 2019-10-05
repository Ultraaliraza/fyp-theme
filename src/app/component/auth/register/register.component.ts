import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// export class RegisterComponent implements OnInit {

//   constructor(private authService: AuthenticationService) { }

//   ngOnInit() {
//   }
//   sendData() {
//     const obj = {
//       id: 1,
//       name: 'Andhera',
//       location: 'Rawalpindi'
//     };
//     this.authService.login(obj);
//   }

// }

export class RegisterComponent implements OnInit {
  myreactiveform: FormGroup;
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.myreactiveform = new FormGroup({
      name:  new FormControl('', [Validators.required, Validators.maxLength(8)]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', [Validators.required, Validators.minLength(8)]),
      accountType:  new FormControl('identifier'),
    });
    // // this.myForm.valueChanges.subscribe(console.log);
    // this.myreactiveform = this.formBuilder.group({
    //   name: ['', [ Validators.required, Validators.minLength(8)]],
    //   email: ['', [ Validators.required, Validators.email]],
    //   password: ['', Validators.required, Validators.minLength(8)],
    //   accountType: ['identifier']
    // });
  }
  get form() {
    return this.myreactiveform.controls;
  }
  submitFrom() {
    console.log(this.myreactiveform);
    // this.authService.register(this.myForm.value);
  }
}
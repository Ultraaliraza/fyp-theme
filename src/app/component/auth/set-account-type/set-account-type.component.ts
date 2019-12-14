import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-set-account-type',
  templateUrl: './set-account-type.component.html',
  styleUrls: ['./set-account-type.component.css']
})

export class SetAccountTypeComponent implements OnInit {

  acountType: any;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() { }

  setType() {
    let id = localStorage.getItem('userMeta');
    this.authenticationService.setAccountType(this.acountType, id)
      .subscribe(
        (success) => {
          return this.authenticationService.checkAccountType(this.acountType);
        },
        (error) => {
          console.log(error);
        });
  }

}

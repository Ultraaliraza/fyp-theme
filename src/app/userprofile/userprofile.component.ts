import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
user ;
  question = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');
    this.authService.user.subscribe((user: any) => {
      this.user = user;


    });
    this.authService.getUserquestion(id).subscribe((posts: any) => {

      this.question = posts.data.ques;
      console.log(this.question);

    });
  }


}

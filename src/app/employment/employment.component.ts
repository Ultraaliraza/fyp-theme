import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getEmployment();
  }

  getEmployment() {
    this.authService.getEmployment().subscribe((data: any) => {
      this.posts = data.data;

      console.log(this.posts);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  posts = [];

  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {

    this.getWomen();
  }
  getWomen() {

    this.authservice.getWomen().subscribe((data: any) => {

      this.posts = data.data;


    });
  }
}

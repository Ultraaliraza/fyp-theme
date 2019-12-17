import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  posts = [];
  lastposts = [];
  users = [];
  user;

  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');
    this.authservice.user.subscribe((user: any) => {
      this.user = user;
    });

    this.getWomen();
    this.getUsers();
    this.getLastPosts();
  }
  getWomen() {

    this.authservice.getWomen().subscribe((data: any) => {

      this.posts = data.data;


    });
  }
  getLastPosts() {
    this.authservice.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;
      console.log(this.lastposts);
    });

  }
  getUsers() {
    this.authservice.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }
}

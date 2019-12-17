import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css']
})
export class MarriageComponent implements OnInit {

  posts = [];
  lastposts = [];
  users = [];
  user;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');
    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.getUsers();
    this.getLastPosts();
    this.getMarriage();
  }
  getMarriage() {
    this.authService.getMarriage().subscribe((data: any) => {
      this.posts = data.data;

      console.log(this.posts);
    });

  }
  getLastPosts() {
    this.authService.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;
      console.log(this.lastposts);
    });

  }

  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }
}

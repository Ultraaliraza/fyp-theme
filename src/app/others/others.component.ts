import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
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
    this.getUsers();
    this.getLastPosts();
    this.getOthers();
  }
  getOthers() {
    this.authservice.getOthers().subscribe((data: any) => {

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

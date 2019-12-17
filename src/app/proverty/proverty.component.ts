import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';


@Component({
  selector: 'app-proverty',
  templateUrl: './proverty.component.html',
  styleUrls: ['./proverty.component.css']
})
export class ProvertyComponent implements OnInit {


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

    this.getProverty();
    this.getUsers();
    this.getLastPosts();
  }
  getProverty() {
    this.authService.getProverty().subscribe((data: any) => {
      this.posts = data.data;
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

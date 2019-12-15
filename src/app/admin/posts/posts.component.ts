import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  Posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.authService.getAllPosts();
  }
  getAlllPosts() {

    this.authService.getAllPosts().subscribe((data: any) => {
      this.Posts = data.data;

    });
  }
}

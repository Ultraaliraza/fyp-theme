import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getAllPosts();
  }
  getAllPosts() {

    this.authService.getAllPosts().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts);

    });
  }
  delete(id) {
    console.log(id);
    this.authService.deletePosts(id);

  }
}

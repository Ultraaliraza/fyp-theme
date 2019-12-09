import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authService: any;
  posts: any;
  route: any;

  constructor() { }

  ngOnInit() {


    this.route.params.subscribe(postID => {
      this.authService.getquestion(postID.key)
        .subscribe((post: any) => {
          this.posts = post.data.post;

        });


    });
  }
  }



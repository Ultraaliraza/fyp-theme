import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts;
  about;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {


    this.route.params.subscribe(userID => {
      this.authService.getprofile(userID.key)
        .subscribe((post: any) => {
          this.posts = post.data.post;
          this.about = this.posts.Comments;
          console.log(this.posts);
        });
    });
  }
}



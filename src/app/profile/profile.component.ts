import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts = [];
  abouts = [];
  id;
  questions = [];
  user;
  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    let user = localStorage.getItem('userMeta');


    this.route.params.subscribe(userID => {
      this.id = userID.key;
      this.authService.getprofile(userID.key)
        .subscribe((post: any) => {
          this.posts = post.data.post;
          console.log(this.posts);
        });
      this.authService.getUserquestion(this.id).subscribe((ques: any) => {
        this.questions = ques.data.ques;
        console.log(this.questions);

      });
    });
  }

}



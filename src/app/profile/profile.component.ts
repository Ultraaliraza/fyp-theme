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
  about;
  id;
  question = [];
  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {


    this.route.params.subscribe(userID => {
      this.id = userID.key;
      this.authService.getprofile(userID.key)
        .subscribe((post: any) => {
          this.posts = post.data.post;
          console.log(this.posts);
          console.log(this.id);


        });
      this.authService.getUserquestion(this.id).subscribe((ques: any) => {

        this.question = ques.data.ques;
        console.log(this.question);

      });
    });
  }

}



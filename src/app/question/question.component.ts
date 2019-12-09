import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  commentform: FormGroup;
  user;
  posts;
  comments;
  commentkeys;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router,
    // tslint:disable-next-line:align
    private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.commentform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Catagory: new FormControl('education'),
        date: new FormControl(),
        name: new FormControl(this.user.name),
        accountType: new FormControl(this.user.accountType),
        PostBy: new FormControl(this.user.key),
        PostImage: new FormControl(''),
        Time: new FormControl(''),
        User_profile_image: new FormControl(),
        PostFile: new FormControl(''),
        id: new FormControl('')
      });



      this.route.params.subscribe(postID => {
        this.authService.getquestion(postID.key)
          .subscribe((post: any) => {
            this.posts = post.data.post;
            this.comments = this.posts.Comments;
            // console.log(this.posts);
            // console.log(this.comments);

            this.commentkeys = Object.keys(this.comments);

            console.log(this.commentkeys);
          });


      });
    });
  } // end Bracket of NgOnit

}

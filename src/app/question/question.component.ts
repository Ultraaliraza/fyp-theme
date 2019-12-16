import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  reportform: FormGroup;
  datePipe = new DatePipe('en-US');
  postID;
  lastposts = [];
  users = [];

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router,
    // tslint:disable-next-line:align
    private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');

    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.commentform = new FormGroup({
        Comment: new FormControl(''),
        // Comment_by: new FormControl(user.key),
        // User_Name: new FormControl(this.user.name),
        Comment_by: new FormControl(id),
        User_Name: new FormControl(this.user.name),
        date: new FormControl(''),
        time: new FormControl(''),
        postID: new FormControl(''),

        user_image: new FormControl(this.user.profile_image)
        // user_image: new FormControl('')

      });

      // Report Form
      this.reportform = new FormGroup({
        Name: new FormControl(''),
        Email: new FormControl(this.user.email),
        Reason: new FormControl('ethical'),
        Message: new FormControl(),
        PostId: new FormControl()

      });
      this.route.params.subscribe(postID => {
        this.postID = postID.key;
        this.authService.getquestion(postID.key)
          .subscribe((post: any) => {
            this.posts = post.data.post;
            this.comments = this.posts.Comments;
            console.log(this.posts);
            console.log(this.comments);
            this.commentkeys = Object.keys(this.comments);
            console.log(this.commentkeys);
          });
      });
    });

    this.getUsers();
    this.getLastPosts();
  }// end Bracket of NgOnit

  getLastPosts() {
    this.authService.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;
      console.log(this.lastposts);
    });

  }
  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      this.users = data.data;
      console.log(this.users);
    });
  }
  submitFrom() {

    const time = this.datePipe.transform(new Date(), 'd-MMM-y');
    const time1 = this.datePipe.transform(new Date(), 'h:mm a');
    this.commentform.controls.date.setValue(time);
    this.commentform.controls.time.setValue(time1);
    this.commentform.controls.postID.setValue(this.postID);
    const obj = this.commentform.value;
    //  this.commentform.controls.Date.setValue(time);
    this.authService.comment(obj).subscribe((data: any) => {
      console.log(this.commentform.value);
    });
  }


  reportFrom() {

    this.reportform.controls.PostId.setValue(this.postID);
    this.authService.Report(this.reportform.value).subscribe((data: any) => {
      console.log(this.reportform.value);
    });

  }

  // reportform() {


  //   console.log(this.reportform);
  //   this.authService.getReport(this.reportform.value);
  // }

}

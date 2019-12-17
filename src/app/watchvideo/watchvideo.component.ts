import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-watchvideo',
  templateUrl: './watchvideo.component.html',
  styleUrls: ['./watchvideo.component.css']
})
export class WatchvideoComponent implements OnInit {
  commentform: FormGroup;
  user;
  posts ;
  comments;
  commentkeys;
  reportform: FormGroup;
  datePipe = new DatePipe('en-US');
  postID;
  lastposts = [];
  users = [];


  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router,
    // tslint:disable-next-line:align
    private formbuilder: FormBuilder) { }

  ngOnInit() {

    let id = localStorage.getItem('userMeta');
    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.getUsers();
    this.getLastPosts();
    this.route.params.subscribe(postID => {
      this.postID = postID.key;
      this.authService.getVideoData(postID.key)
        .subscribe((post: any) => {
          this.posts = post.data.post;
          console.log(this.posts.Details);
          this.comments = this.posts.Comments;
          console.log(this.posts);
          console.log(this.comments);
          this.commentkeys = Object.keys(this.comments);
          console.log(this.commentkeys);
        });
    });

  }
  submitFrom()
  {
    const time = this.datePipe.transform(new Date(), 'd-MMM-y');
    const time1 = this.datePipe.transform(new Date(), 'h:mm a');
    this.commentform.controls.date.setValue(time);
    this.commentform.controls.time.setValue(time1);
    this.commentform.controls.postID.setValue(this.postID);
    const obj = this.commentform.value;
    //  this.commentform.controls.Date.setValue(time);
    this.authService.Videocomment(obj).subscribe((data: any) => {
      this.commentform.reset();
      console.log(this.commentform.value);
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

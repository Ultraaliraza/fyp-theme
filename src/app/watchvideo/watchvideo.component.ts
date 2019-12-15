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
  posts;
  comments;
  commentkeys;
  reportform: FormGroup;
  datePipe = new DatePipe('en-US');
  postID;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router,
    // tslint:disable-next-line:align
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    // this.route.params.subscribe(postID => {
    //   this.postID = postID.key;
    //   // this.authService.getVideos(postID.key)
    //     .subscribe((post: any) => {
    //       this.posts = post.data.post;
    //       this.comments = this.posts.Comments;
    //       console.log(this.posts);
    //       console.log(this.comments);
    //       this.commentkeys = Object.keys(this.comments);
    //       console.log(this.commentkeys);
    //     });
    // });
  }

}

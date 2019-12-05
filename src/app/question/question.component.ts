import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  qtitile;
  qid;
  qdescription;
  qimage;
  posts = [];
  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) {

    route.params.subscribe(value => {
      this.qid = value.key;
      this.qdescription = value.Title;
      this.qimage = value.User_profile_image;



      console.log(this.qid); 

    });

  }
  ngOnInit() {
    this.authService.getquestion(this.qid)
    .subscribe((post: any) => {
      this.posts = post.data.post;
      console.log(this.posts );
    });
  }

}

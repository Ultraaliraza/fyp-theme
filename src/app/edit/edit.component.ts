import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user;
  postid;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.user = this.user.key;

    this.route.params.subscribe(postID => {
      this.postid = postID.key;

      const obj = { id: this.user, pid: this.postid };
      this.authService.Editpost(obj);
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  posts = [];

  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {

    this.getChild();
  }

  getChild() {

    this.authservice.getChild().subscribe((data: any) => {
      this.posts = data.data;

    });
  }

}

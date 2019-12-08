import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  posts = [];
  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {
    this.getOthers();
  }
  getOthers() {
    this.authservice.getOthers().subscribe((data: any) => {

      this.posts = data.data;

    });

  }
}

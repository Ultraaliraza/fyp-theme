import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {

  posts = [];
  user;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');

    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });

    this.getgetdonations();
  }

  getgetdonations() {
    this.authService.getgetdonations().subscribe((data: any) => {
      this.posts = data.data;

      console.log(this.posts);
    });

  }

}

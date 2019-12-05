import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {

  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getgetdonations();
  }

  getgetdonations() {
    this.authService.getgetdonations().subscribe((data: any) => {
      this.posts = data.data;
    });

  }

}

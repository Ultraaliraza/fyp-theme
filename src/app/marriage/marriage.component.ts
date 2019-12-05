import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';


@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css']
})
export class MarriageComponent implements OnInit {

  posts = [];


  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

       this.getMarriage();
  }
  getMarriage() {
    this.authService.getMarriage().subscribe((data: any) => {
      this.posts = data.data;
    });

  }
}

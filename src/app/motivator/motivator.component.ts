import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-motivator',
  templateUrl: './motivator.component.html',
  styleUrls: ['./motivator.component.css']
})
export class MotivatorComponent implements OnInit {
  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getPOSTS();

  }

  getPOSTS() {
    this.authService.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });
  }

}

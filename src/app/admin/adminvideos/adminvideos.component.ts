import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-adminvideos',
  templateUrl: './adminvideos.component.html',
  styleUrls: ['./adminvideos.component.css']
})
export class AdminvideosComponent implements OnInit {

  posts = [];

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllVideos();
  }
  getAllVideos() {


    this.authService.getAllVideos().subscribe((data: any) => {

      this.posts = data.data;
      console.log(this.posts);

    });
  }


}

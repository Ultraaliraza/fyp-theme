import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-adminvideos',
  templateUrl: './adminvideos.component.html',
  styleUrls: ['./adminvideos.component.css']
})
export class AdminvideosComponent implements OnInit {

  videos =[];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
      this.authService.getAllVideos();
  }
  getAllVideos() {


    this.authService.getAllVideos().subscribe((data: any) =>{

    this.videos = data.data ;

    });
  }
}

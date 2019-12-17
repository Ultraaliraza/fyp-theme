import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UploadfilesService } from '../service/uploadfiles.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  posts = [];
  user;
  users = [];
  lastposts = [];



  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public uploadfilesService: UploadfilesService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');
    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });

    this.getVideos();
    this.getUsers();
    this.getLastPosts();
  }
  getVideos() {
    this.authService.getVideos().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts);
    });

  }
  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  getLastPosts() {
    this.authService.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;
      console.log(this.lastposts);
    });
  }

}

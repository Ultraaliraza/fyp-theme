import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UploadfilesService } from '../service/uploadfiles.service';


@Component({
  selector: 'app-motivator',
  templateUrl: './motivator.component.html',
  styleUrls: ['./motivator.component.css']
})
export class MotivatorComponent implements OnInit {
  posts = [];
  datePipe = new DatePipe('en-US');
  myvideoform: FormGroup ;
  lastposts = [];
  users = [];
  user;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');

    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.myvideoform = new FormGroup({
        Title: new FormControl(''),
        Details: new FormControl(''),
        Category: new FormControl('education'),
        Date: new FormControl(),
        UserName: new FormControl(this.user.name),
        UploadedBy: new FormControl(id),
        Video: new FormControl(''),
        Time: new FormControl(''),
        Profile_Image: new FormControl(this.user.profile_image)

      });
    });



    this.getPOSTS();
    this.getUsers();
    this.getLastPosts();

  }
  videoFrom() {
    const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    this.myvideoform.controls.Date.setValue(time);

    // this.uploadfilesService.uploadFile()
    //   .then((fileMeta) => {
    //     this.myvideoform.controls.PostVideo.setValue(fileMeta);
    //     this.authService.Videos(this.myvideoform.value).subscribe((data: any) => {
    //       this.router.navigate(['/home']);
    //     });
    //   });

}

  getPOSTS() {
    this.authService.getPosts().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts);
    });
  }
  getLastPosts() {
    this.authService.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }
}

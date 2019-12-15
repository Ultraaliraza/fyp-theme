import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { Router } from '@angular/router';
import { UploadfilesService } from '../service/uploadfiles.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  posts = [];
  myhomeform: FormGroup;
  mydonationform: FormGroup;
  myvideoform: FormGroup;
  user;
  lastposts = [];
  users = [];
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
      console.log(this.user.key);
      this.myhomeform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Category: new FormControl('education'),
        Date: new FormControl(),
        Name: new FormControl(this.user.name),
        acountType: new FormControl(this.user.acountType),
        PostBy: new FormControl('pR0pfcDDZRS9l1MCIKkxQNUstw53'),
        PostImage: new FormControl(''),
        Postfile: new FormControl(''),
        Time: new FormControl(''),
       User_profile_image: new FormControl(this.user.profile_image),
        id: new FormControl('')
      });

      this.mydonationform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Category: new FormControl('education'),
        Date: new FormControl(),
        Name: new FormControl(this.user.name),
        acountType: new FormControl(this.user.acountType),
        PostBy: new FormControl(this.user.key),
        PostImage: new FormControl(''),
        Time: new FormControl(''),
        profile_image: new FormControl(''),
        id: new FormControl('')

      });
      this.myvideoform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Category: new FormControl('education'),
        Date: new FormControl(),
        Name: new FormControl(this.user.name),
        acountType: new FormControl(this.user.acountType),
        PostBy: new FormControl(this.user.key),
        Video: new FormControl(''),
        Time: new FormControl(''),
        profile_image: new FormControl(this.user.profile_image),
        id: new FormControl('')

      });
    });
    this.getPOSTS();
    this.getUsers();
    this.getLastPosts();
  }

  getPOSTS() {
    this.authService.getPosts().subscribe((data: any) => {
      this.posts = data.data;
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
    });
  }

  submitFrom() {
    const time = this.datePipe.transform(new Date(), 'd-MMM-y');
    const time1 = this.datePipe.transform(new Date(), 'h:mm a');
    this.myhomeform.controls.Date.setValue(time);
    this.myhomeform.controls.Time.setValue(time1);
    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        // tslint:disable-next-line:no-string-literal
        // this.myhomeform.controls.PostImage.setValue(fileMeta['url']);
        this.authService.home(this.myhomeform.value).subscribe((data: any) => {

          console.log(this.myhomeform.value);
          this.router.navigate(['/home']);
        });
      });
  }
  videoFrom() {
    const time = this.datePipe.transform(new Date(), 'd-MMM-y');
    const time1 = this.datePipe.transform(new Date(), 'h:mm a');
    this.myvideoform.controls.Date.setValue(time);
    this.myvideoform.controls.Time.setValue(time1);

    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        this.myhomeform.controls.Video.setValue(fileMeta);
        this.authService.Videos(this.myvideoform.value).subscribe((data: any) => {
          this.router.navigate(['/home']);
        });
      });
  }

  donFrom() {
    const time = this.datePipe.transform(new Date(), 'd-MMM-y');
    const time1 = this.datePipe.transform(new Date(), 'h:mm a');
    this.mydonationform.controls.Date.setValue(time);
    this.mydonationform.controls.Time.setValue(time1);


    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        this.myhomeform.controls.PostImage.setValue(fileMeta);
        this.authService.getdonations(this.mydonationform.value).subscribe((data: any) => {
          this.router.navigate(['/home']);
        });
      });
  }

}


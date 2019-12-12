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
    let uid = localStorage.getItem('userMeta');

    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.myhomeform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Catagory: new FormControl('education'),
        date: new FormControl(),
        name: new FormControl(this.user.name),
        accountType: new FormControl(this.user.accountType),
        PostBy: new FormControl(this.user.key),
        PostImage: new FormControl(''),
        Time: new FormControl(''),
        User_profile_image: new FormControl(''),
        uid: new FormControl(uid)
      });

      this.mydonationform = new FormGroup({
        Title: new FormControl(''),
        Description: new FormControl(''),
        Category: new FormControl('education'),
        date: new FormControl(),
        name: new FormControl(this.user.name),
        accountType: new FormControl(this.user.accountType),
        PostBy: new FormControl(this.user.key),
        PostImage: new FormControl(''),
        Time: new FormControl(''),
        User_profile_image: new FormControl(''),
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
    const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    this.myhomeform.controls.date.setValue(time);

    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        this.myhomeform.controls.PostImage.setValue(fileMeta);
        this.authService.home(this.myhomeform.value).subscribe((data: any) => {
          this.router.navigate(['/home']);
        });
      });
  }

  donFrom() {
    this.authService.getdonations(this.mydonationform.value);
  }

}


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
    private uploadfilesService: UploadfilesService,
    private router: Router
  ) { }
  ngOnInit() {
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
        id: new FormControl('')
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

      console.log(this.users);
    });

  }

  getLastPosts() {


    this.authService.getLastPosts().subscribe((data: any) => {
      this.lastposts = data.data;

      console.log(this.lastposts);

    });
  }

  submitFrom() {
    console.log(this.myhomeform);
    const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    this.myhomeform.controls.date.setValue(time);

    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        this.myhomeform.controls.PostImage.setValue(fileMeta);
        this.authService.home(this.myhomeform.value).subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/home']);
        });
      });
  }

  donFrom() {


    console.log(this.mydonationform);
    this.authService.getdonations(this.mydonationform.value);
  }

  //  Display selected file 
  onSelectFile(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      // if (file.size <= 512000) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.uploadfilesService.filesMeta = { name: file.name, url: <string>(event.target['result']), size: file.size, file: file };
      }
      // }
    }
    else {
      this.uploadfilesService.filesMeta = undefined;
    }
  }
}


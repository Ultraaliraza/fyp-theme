import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth-service/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  totaluser;
  totalreport;
  totaldonation;
  totalvideo;
  totalbanuser;
  totalpost;
  constructor(private authService: AuthenticationService) { }
  ngOnInit() {
    this.authService.getDonationsCount();
    this.authService.getBannCount();
    this.authService.getPostCount();
    this.authService.getReportsCount();
    this.authService.getVideosCount();
    this.authService.getUsersCount();
  }
  getDonationCount() {
    this.authService.getDonationsCount().subscribe((data: any) => {
      this.totaldonation = data.data;
      console.log(this.totaldonation);
    });
  }
    getBannCount() {
    this.authService.getBannCount().subscribe((data: any) => {
      this.totalbanuser = data.data;
      console.log(this.totalbanuser);
    });
  }
  getPostCount() {
    this.authService.getPostCount().subscribe((data: any) => {
      this.totalpost = data.data;
      console.log(this.totalpost);
    });
  }
  getReportCount() {
    this.authService.getReportsCount().subscribe((data: any) => {
      this.totalreport = data.data;
      console.log(this.totalreport);
    });
  }
  getVideosCount() {
    this.authService.getVideosCount().subscribe((data: any) => {
      this.totalvideo = data.data;
      console.log(this.totalvideo);

    });
  }
  getUsersCount() {
    this.authService.getUsersCount().subscribe((data: any) => {
      this.totaluser = data.data;
      console.log(this.totaluser);

    });
  }

}

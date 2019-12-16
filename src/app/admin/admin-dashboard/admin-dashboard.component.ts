import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css', '../admin-shared.css']
})
export class AdminDashboardComponent implements OnInit {
  totaluser;
  totalreport;
  totaldonation;
  totalvideo;
  totalbanuser;
  totalpost;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getDonationCount();
    this.getBannCount();
    this.getPostCount();
    this.getReportCount();
    this.getVideosCount();
    this.getUsersCount();
  }
  getDonationCount() {
    this.authService.getDonationsCount().subscribe((data: any) => {
      this.totaldonation = data.count;
      console.log(this.totaldonation);
    });
  }
  getBannCount() {
    this.authService.getBannCount().subscribe((data: any) => {
      this.totalbanuser = data.count;
      console.log(this.totalbanuser);
    });
  }
  getPostCount() {
    this.authService.getPostCount().subscribe((data: any) => {
      this.totalpost = data.count;
      console.log(this.totalpost);
    });
  }
  getReportCount() {
    this.authService.getReportsCount().subscribe((data: any) => {
      this.totalreport = data.count;
      console.log(this.totalreport);
    });
  }
  getVideosCount() {
    this.authService.getVideosCount().subscribe((data: any) => {
      this.totalvideo = data.count;
      console.log(this.totalvideo);

    });
  }
  getUsersCount() {
    this.authService.getUsersCount().subscribe((data: any) => {
      this.totaluser = data.count;
      console.log(this.totaluser);

    });
  }

}

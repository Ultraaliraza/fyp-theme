import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllReports();
  }
  getAllReports() {


    this.authService.getAllReports().subscribe((data: any) => {

      this.posts = data.data;
      console.log(this.posts);

    });
  }
}

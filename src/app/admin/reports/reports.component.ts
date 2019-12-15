import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  Reports = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getAllReports();
  }
  getAllReports() {


    this.authService.getAllReports().subscribe((data: any) => {

      this.Reports = data.data;

    });
  }
}

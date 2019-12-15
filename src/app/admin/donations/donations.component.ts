import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  donations = [];
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.authService.getAllDonations();
  }

  getAllDonations() {

    this.authService.getAllDonations().subscribe((data: any) => {
      this.donations = data.data;


    });
  }
}

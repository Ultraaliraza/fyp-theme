import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class AdminDonationsComponent implements OnInit {

  posts = [];
  key;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getAllDonations();
  }

  getAllDonations() {

    this.authService.getAllDonations().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts);


    });
  }
  delete(id) {

    console.log(id);

    this.authService.deleteDonations(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-bannusers',
  templateUrl: './bannusers.component.html',
  styleUrls: ['./bannusers.component.css']
})
export class BannusersComponent implements OnInit {
  Bann = [];
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.authService.getAllBannUsers();
  }
  getAllBannUsers() {

    this.authService.getAllBannUsers().subscribe((data: any) => {

      this.Bann = data.data;

    });
  }
}

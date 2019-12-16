import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-bannusers',
  templateUrl: './bannusers.component.html',
  styleUrls: ['./bannusers.component.css']
})
export class BannusersComponent implements OnInit {
     posts =[];
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getAllUsers();
  }
  getAllUsers() {

    this.authService.getAllUsers().subscribe((data: any) => {

      this.posts = data.data;
      console.log(this.posts);

    });
  }
}

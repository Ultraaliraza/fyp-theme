import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
   this.authService.getAllUsers();
   this.authService.Deleteuser();
}
   getAllUsers() {

    this.authService.getAllUsers().subscribe((data: any) => {

      this.users = data.data;

    });
   }
}

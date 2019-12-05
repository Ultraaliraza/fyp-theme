import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  posts = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this.getEducation();
  }
  getEducation() {
    this.authService.getEducation().subscribe((data: any) => {
      this.posts = data.data;
    });

  }
}

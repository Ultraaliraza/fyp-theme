import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';


@Component({
  selector: 'app-proverty',
  templateUrl: './proverty.component.html',
  styleUrls: ['./proverty.component.css']
})
export class ProvertyComponent implements OnInit {

  posts = [];


  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

       this.getProverty();
  }
  getProverty() {
    this.authService.getProverty().subscribe((data: any) => {
      this.posts = data.data;
    });

  }
}

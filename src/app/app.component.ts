import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FYP-THEME';
  constructor() { }

  ngOnInit() {
    var firebaseConfig = {
      apiKey: "AIzaSyBbYhFMjE_V_6ySKmVm7Ydg9zItA4jrniM",
      authDomain: "fevrerr-like.firebaseapp.com",
      databaseURL: "https://fevrerr-like.firebaseio.com",
      projectId: "fevrerr-like",
      storageBucket: "fevrerr-like.appspot.com",
      messagingSenderId: "854243513866",
      appId: "1:854243513866:web:f030eee83cad7cfd66b1f3",
      measurementId: "G-9B77BTDPDR"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

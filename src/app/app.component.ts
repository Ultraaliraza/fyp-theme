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
      apiKey: "AIzaSyA7DSbicFSqkr65hgE77XI2XlVEUbuej88",
      authDomain: "helpinghand-90a6a.firebaseapp.com",
      databaseURL: "https://helpinghand-90a6a.firebaseio.com",
      projectId: "helpinghand-90a6a",
      storageBucket: "helpinghand-90a6a.appspot.com",
      messagingSenderId: "798640926929",
      appId: "1:798640926929:web:4f93bb3fa46e93fcfa95f0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

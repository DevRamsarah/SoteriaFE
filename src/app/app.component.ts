import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SoteriaFE';
  isSignIn = false;
  logIn = (localStorage.getItem('userid') !== null ? true : false);
  constructor(public firebaseService: FirebaseService) { }
  ngOnInit() {
    if (localStorage.getItem('user') !== null)
      this.isSignIn = true
    else
      this.isSignIn = false
  }






}

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
    console.log(this.logIn);

    if (localStorage.getItem('user') !== null)
      this.isSignIn = true
    else
      this.isSignIn = false
  }


  async onSignup(email: string, name: string, age: number, address: string, tel: string, password: string) {
    await this.firebaseService.signup(email, name, age, address, tel, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignIn = true
  }



  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignIn = true
  }
  handleLogout() {
    this.isSignIn = false

  }
}

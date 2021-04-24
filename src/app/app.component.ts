import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SoteriaFE';
  logIn = (localStorage.getItem('userid') !== null ? true : false);
  constructor(public firebaseAuth: AngularFireAuth,public firebaseService: FirebaseService, public router:Router) { }
 
  ngOnInit() {
  
    const url = window.location.href
    if (this.router.url == "/" && new URLSearchParams(window.location.search).has("apiKey")){
    this.confirmLog(url)}

  }

  async confirmLog(url){

    if( this.firebaseAuth.isSignInWithEmailLink(url)){
      let email= window.prompt('Please provide your email for confirmation')
      console.log(url);
      console.log(email);
      
      const result = await this.firebaseAuth.signInWithEmailLink(email,url)
      console.log(result);
      
    }
  }





}

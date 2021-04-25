import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
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
    if(this.logIn){


      if(localStorage.getItem('passwordless') == "true"){
        let password=""
        Swal.fire({
          title: 'Enter your password',
          input: 'password',
          inputLabel: 'Password',
          inputPlaceholder: 'Enter your password',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          },
          allowOutsideClick:false,
          confirmButtonText: 'Save',
          preConfirm: (login) => { password = `${login}`},
          allowEscapeKey:false
        }).then(()=> this.firebaseService.updatePassword(password).catch(
          (err)=> 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: err.message
          })
        ).then(()=> localStorage.removeItem("passwordless")))
      }
    }

  }

  






}

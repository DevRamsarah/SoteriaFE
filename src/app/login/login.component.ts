import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMssg = ""
  forget = false
  InOut = true;
  loading = false;
  @Output() log: EventEmitter<any> = new EventEmitter();
  constructor(public firebaseAuth: AngularFireAuth, public firebaseService: FirebaseService, private router: Router) { }
  ngOnInit(): void {


    const url = window.location.href
    if (this.router.url == "/" && new URLSearchParams(window.location.search).has("apiKey")) {
      this.confirmLog(url)
    }
  }

  async confirmLog(url) {
    try {
      if (this.firebaseAuth.isSignInWithEmailLink(url)) {
        let email = window.prompt('Please provide your email for confirmation')
        const result = await this.firebaseAuth.signInWithEmailLink(email, url)
        localStorage.setItem('passwordless', "true")
        localStorage.setItem('userid', result.user.uid)
        window.location.href = "Dashboard"
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message
      })
    }

  }

  onSignin(email: string, password: string) {
    this.loading = true;


    this.firebaseService.signin(email, password).then(() => {
      // this.router.navigate(['/Dashboard'])
      this.redirect()
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err
      })
      console.log(err);
      this.errMssg = err
      this.loading = false;

    })
    this.loading = true;
  }
  onSignup(email: string, password: string, rpassword: string, name: string) {
    //   if(password === rpassword){
    //   // this.firebaseService.signup(email, password, fname, lname).then(() => {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Registration successful',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })

    //   }).catch(err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Something went wrong!',
    //       footer: err
    //     })
    //     console.log(err);
    //     this.errMssg = err
    //     this.loading = false;

    //   })
    // }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: "No Register Available"
    })
    // }
  }
  clickEvent() {
    this.InOut = !this.InOut;
  }
  redirect() {
    setTimeout(() => {
      switch (JSON.parse(localStorage.getItem('CurentUser'))[0].role) {
        case "Admin":
          window.location.href = "Dashboard"
          break;
        case "Client":
          window.location.href = "Location"
          break;
        default:
        case "Guard":
          Swal.fire({
            icon: 'warning',
            title: 'Guard Mail Detected!',
            text: 'Please use the Mobile app.',
            footer: "Please contact the admin to resolve this issue."
          }).then(() => {
            localStorage.clear();
            window.location.reload()
          })
          break;
          localStorage.clear();
          window.location.reload()
          break;
      }
      if (JSON.parse(localStorage.getItem('CurentUser'))[0].role == "Admin") {
        window.location.href = "Dashboard"
      } else { }

    }, 4000);
  }
  forgetP() {
    this.forget ? this.forget = false : this.forget = true
  }
  resetP(email) {
    this.firebaseService.reset(email)
  }
}

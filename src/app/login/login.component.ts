import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMssg=""
  forget=false
  InOut = true;
  loading = false;
  @Output() log: EventEmitter<any> = new EventEmitter();
  constructor(public firebaseService: FirebaseService, private router: Router) { }
  ngOnInit(): void {
  }
  onSignin(email: string, password: string) {
    this.loading = true;


    this.firebaseService.signin(email, password).then(() => {
      // this.router.navigate(['/Dashboard'])
      window.location.href = "Dashboard"
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
  onSignup(email: string, password: string,rpassword: string, name:string) {
    if(password === rpassword){
    this.firebaseService.signup(email, password,name).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1500
      })
     
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
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: "Password do not match. Please try again"
    })
  }
  }
  clickEvent() {
    this.InOut = !this.InOut;
  }

  forgetP(){
    this.forget? this.forget=false: this.forget=true
  }
  resetP(email){
    this.firebaseService.reset(email)
  }
}

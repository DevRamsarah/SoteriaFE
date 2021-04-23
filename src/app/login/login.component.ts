import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      console.log(err);
      this.loading = false;

    })
    this.loading = true;
  }
  clickEvent() {
    this.InOut = !this.InOut;
  }

  forgetP(){
    this.forget? this.forget=false: this.forget=true
  }
}

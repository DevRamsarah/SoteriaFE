import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  InOut = true;
  @Output() log: EventEmitter<any> = new EventEmitter();
  constructor(public firebaseService: FirebaseService) { }
  ngOnInit(): void {
  }
  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password)
    window.location.href = "/Dashboard"
  }
}

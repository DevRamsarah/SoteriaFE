import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  InOut = true;
  @Output() log: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  enterWebsite() {
    this.log.emit();


  }
  clickEvent() {
    this.InOut = !this.InOut;
  }

}

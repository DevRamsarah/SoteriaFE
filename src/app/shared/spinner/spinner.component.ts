import { Component, OnInit,Input } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
    public firebaseService: FirebaseService
    constructor() {}

  @Input() title;

  ngOnInit(): void {
    this.firebaseService.getOneUser(localStorage.getItem('userid')).subscribe((user: any) => {
      console.log(user);
      
      localStorage.setItem('CurentUser', JSON.stringify(user))
    })
  }
}

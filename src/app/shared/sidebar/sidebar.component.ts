import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()
  status: boolean = false;
  role 
  constructor(public firebaseService: FirebaseService
  ) {
    this.firebaseService.getOneUser(localStorage.getItem('userid')).subscribe((user: any) => {
      localStorage.setItem('CurentUser', JSON.stringify(user))
    })



  }

  logout(): void {
    this.firebaseService.logout()
    this.isLogout.emit()
  }
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.role = (JSON.parse(localStorage.getItem('CurentUser'))[0].role == "Admin") ? true : false

  }
}

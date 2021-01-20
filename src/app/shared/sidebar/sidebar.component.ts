import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()

  constructor(public firebaseService: FirebaseService
  ) {
  }

  logout(): void {
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  ngOnInit(): void { }
}

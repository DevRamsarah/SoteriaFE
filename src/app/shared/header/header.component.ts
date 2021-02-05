import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  displayName: string;
  _name;
  _role;
  constructor() { }

  ngOnInit(): void {
    this.displayName = localStorage.getItem('userName')
  }
  logout() {
    localStorage.clear();
    window.location.reload()
  }
}

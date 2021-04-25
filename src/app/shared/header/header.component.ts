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
    let CurentUser =JSON.parse(localStorage.getItem('CurentUser'))
console.log(CurentUser);

    this.displayName = CurentUser[0].fname + " " + CurentUser[0].lname + " ("+ CurentUser[0].role+ ")"
  }
  logout() {
    localStorage.clear();
    window.location.reload()
  }
}

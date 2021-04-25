import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  displayName: string;
  _name;
  _role;
role = false
  constructor(    public firebaseService: FirebaseService,
    ) { }

  ngOnInit(): void {
    this.firebaseService.getOneUser(localStorage.getItem('userid')).subscribe((user: any) => {
      console.log(user);
      
      localStorage.setItem('CurentUser', JSON.stringify(user))
    })


    let CurentUser =JSON.parse(localStorage.getItem('CurentUser'))
    this.role =  (JSON.parse(localStorage.getItem('CurentUser'))[0].role == "Admin")?true:false


    this.displayName = CurentUser[0].fname + " " + CurentUser[0].lname + " ("+ CurentUser[0].role+ ")"

}
  logout() {
    localStorage.clear();
    window.location.reload()
  }
}

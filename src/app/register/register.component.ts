import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  CurentUser =JSON.parse(localStorage.getItem('CurentUser'))

    fname
    lname
    email
    num
    password
    rpassword


  constructor(public firebaseService: FirebaseService,) {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'

    }

  ngOnInit(): void {

  }
  admin() {
    if(this.password === this.rpassword){
    this.firebaseService.signup(this.email, this.password,this.fname,this.lname).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>window.location.href="Dashboard")
     
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err
      })
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
}

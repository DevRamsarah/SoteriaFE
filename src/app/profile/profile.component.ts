import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CurentUser =JSON.parse(localStorage.getItem('CurentUser'))
  map: mapboxgl.Map;
  marker1:any
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = -20.23930295803079;
  lng = 57.57140179981943;
  message = 'Hello World';
  bounds = [
    [56.71206514379577, -20.702642368289588], // Southwest coordinates
    [58.47918717931003, -19.6383333967767] // Northeast coordinates
  ];

    fname
    lname
    email
    num
    dob
    address
    zone
    latitude
    longitude


  constructor(public firebaseService: FirebaseService,) {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'

   }

  ngOnInit(): void {
    this.CurentUser =JSON.parse(localStorage.getItem('CurentUser'))
      this.fname= this.CurentUser[0].fname,
      this.lname= this.CurentUser[0].lname,
      this.email= this.CurentUser[0].email,
      this.num= this.CurentUser[0].num,
      this.dob= this.CurentUser[0].dob,
      this.address= this.CurentUser[0].address,
      this.zone= this.CurentUser[0].zome,
      this.latitude= this.CurentUser[0].latitude,
      this.longitude= this.CurentUser[0].longitude
  

    this.initializeMap()
  }
  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      minZoom: 8,
      zoom: 9,
      center: [this.longitude, this.latitude],
      maxBounds: this.bounds


    })
    // //add navigation control to map 
    this.map.addControl(new mapboxgl.NavigationControl());

   
    this.map.on('load', (event) => {
     
      this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
      this.marker1.setLngLat([this.longitude, this.latitude])
        .addTo(this.map);

    })
  
  }
  password(){
    let password=""
    Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      allowOutsideClick:false,
      confirmButtonText: 'Save',
      preConfirm: (login) => { password = `${login}`},
      allowEscapeKey:false
    }).then(()=> this.firebaseService.updatePassword(password).catch(
      (err)=> 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err.message
      })
    ).then(()=> localStorage.removeItem("passwordless")))
  }
}

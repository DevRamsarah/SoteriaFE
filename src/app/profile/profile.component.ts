import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  currentUser={
    fname:"",
    lname:"",
    email:"",
    num:"",
    dob:"",
    address:"",
    zome:"",
    latitude:"",
    longitude:""

  }
  constructor() {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'

   }

  ngOnInit(): void {
    this.initializeMap()
  }
  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      minZoom: 8,
      zoom: 9,
      center: [this.lng, this.lat],
      maxBounds: this.bounds


    })
    // //add navigation control to map 
    this.map.addControl(new mapboxgl.NavigationControl());

   
    this.map.on('load', (event) => {
     
    // //   this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
    // //   this.marker1.setLngLat([element.Longitude, element.Latitude])
    // //   .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
    // // .setHTML('<h3> Name: ' + element.ClientName + '</h3><p> Address: ' + element.ClientAddress + '</p>'))
    // //     .addTo(this.map);

    })
  
  }
}

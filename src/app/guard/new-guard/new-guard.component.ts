import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/services/guard/guard.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../services/map/map.service';
import { GeoJson } from '../../../model/map/map'
import * as turf from '@turf/turf';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-new-guard',
  templateUrl: './new-guard.component.html',
  styleUrls: ['./new-guard.component.css']
})
export class NewGuardComponent implements OnInit {
  status = null
  loading = false;
  isChecked = true
  loadingEdit = true;
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

cemail=false;
 

  color: ThemePalette = 'primary';

  datePickerId = new Date().toISOString().split("T")[0];
  currentUser={
    id:"",
    fname:"",
    lname:"",
    email:"",
    num:"",
    nic:"",
    address:"",
    zome:"",
    latitude:"",
    longitude:"",
    role:""

  }
  guardObject = {
    fname: null,
    Email: '',
    lname: null,
    MobileNum: null,
    PhoneNum: null,
    faxNum: null,
    address: null,
    Latitude: '',
    Longitude: '',
    PsLocation: '',
    nid:null,
    gender: null,
    Zone: null,
    recordStatus: "active"

  }

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = -20.23930295803079;
  lng = 57.57140179981943;
  message = 'Hello World';
  bounds = [
    [56.71206514379577, -20.702642368289588], // Southwest coordinates
    [58.47918717931003, -19.6383333967767] // Northeast coordinates
  ];
  source: any;

  markers: any;
  dropdown: any = []
  marker1 = new mapboxgl.Marker({ draggable: true, color: "#d02922" })

  constructor(public userService: FirebaseService,public firebaseCrud: GuardService, public router: Router, private mapService: MapService) { }

  ngOnInit(): void {
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit Guard"
      this.firebaseCrud.getOneGuard(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.guardObject = {
          gender: client.gender,
          Email: client.Email,
          fname: client.fname,
          lname: client.lname,
          MobileNum: client.MobileNum,
          PhoneNum: client.PhoneNum,
          faxNum: client.faxNum,
          address: client.address,
          nid: client.nid,
          Latitude: client.Latitude,
          Longitude: client.Longitude,
          PsLocation: client.PsLocation,
          Zone: client.Zone,
          recordStatus: "active"


        }
      })
    } else {
      this.status = "New Guard"
    }

    setTimeout(() => {
      this.loadingEdit = false
          
        }, 3500);
    setTimeout(() => {
      this.initializeMap()
      
    }, 4000);

    

  
  this.mapService.getAllZone().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      this.dropdown.push(doc.data())
    });
    console.log(this.dropdown);
    // console.log(this.dropdown[1]);
  
  })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    }
  
  
  
  
    initializeMap() {
  
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        minZoom: 2,
        zoom: 9,
        center: [this.lng, this.lat],
        maxBounds: this.bounds
  
  
      })
      //add navigation control to map 
  
  
      this.map.on('click', (event) => {
        this.marker1.remove();
        const coordinates = [event.lngLat.lng, event.lngLat.lat]
        const newMarker = new GeoJson(coordinates, { message: this.message })
        this.marker1.setLngLat(coordinates)
          .addTo(this.map);
          
          this.guardObject.Latitude = event.lngLat.lat.toFixed(6)
          this.guardObject.Longitude = event.lngLat.lng.toFixed(6)
          this.checkZone(this.guardObject.Longitude, this.guardObject.Latitude)
      })
  
      if (new URLSearchParams(window.location.search).has("edit")) {
        this.marker1.setLngLat([this.guardObject.Longitude, this.guardObject.Latitude])
          .addTo(this.map);
      }
  
      this.checkZone(this.guardObject.Longitude, this.guardObject.Latitude)
    }
  
    removeMarker(marker) {
      this.mapService.removeMarker(marker.$key)
    }
  
    flyTo(data: GeoJson) {
      this.map.flyTo({
        center: data.geometry.coordinates
  
      })
    }
  
    checkZone(lng, lat) {
      var pt = turf.point([lng, lat]);
      this.dropdown.forEach(zoneS => {
        var poly = turf.polygon(JSON.parse(zoneS.coords));
        if (turf.booleanPointInPolygon(pt, poly)) {
          // console.log(zoneS.region);
          this.guardObject.Zone = zoneS.region
          // console.log(turf.booleanPointInPolygon(pt, poly));
        }
      });
  
    }

    ValidateEmail(){
      this.guardObject.Email.match(this.mailformat)? this.cemail = false: this.cemail=true;
      
    }
    submit() {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (new URLSearchParams(window.location.search).has("edit")) {
            this.firebaseCrud.updateGuard(new URLSearchParams(window.location.search).get("edit"), this.guardObject).then(
              () => {
                Swal.fire('Guard data edited!', '', 'success')
                this.router.navigate(["Guards"]);              }
            )
          } else {

            this.firebaseCrud.createNewGuard(this.guardObject).then(
              (user) => {
                this.currentUser = {
                  id:user.id,
                  fname: this.guardObject.fname,
                  lname: this.guardObject.lname,
                  email: this.guardObject.Email,
                  num: this.guardObject.MobileNum,
                  nic: this.guardObject.nid,
                  address: this.guardObject.address,
                  zome: this.guardObject.Zone,
                  latitude: this.guardObject.Latitude,
                  longitude: this.guardObject.Longitude,
                  role:"Guard"
                }
                this.userService.createNewUser(this.currentUser).then(() => {
                  Swal.fire('Guard data saved!', '', 'success')
                  this.router.navigate(["Guards"]); 
                })
                
                
              }
            )
          }

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
     
  
      // console.log(this.guardObject);
      
    }
}
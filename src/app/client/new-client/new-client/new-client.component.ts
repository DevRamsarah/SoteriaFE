import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../../services/map/map.service';
import { GeoJson } from '../../../../model/map/map'
import * as turf from '@turf/turf';
import Swal from 'sweetalert2'
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  status = null
  loading = false;
  isChecked = true
  loadingEdit = true;
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneno = /^\d{10}$/;
  cemail = false;
  cpnum = false;

  clientObject = {
    Category: null,
    ClientEmail: null,
    ClientName: null,
    ContactName: null,
    MobileNum: null,
    PhoneNum: null,
    faxNum: null,
    ClientAddress: null,
    Latitude: '',
    Longitude: '',
    PsLocation: null,
    Zone: null,
    recordStatus: "active"
  }
  currentUser = {
    id:"",
    fname: "",
    lname: "",
    email: "",
    num: "",
    nic: "",
    address: "",
    zome: "",
    latitude: "",
    longitude: "",
    role:""

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
  constructor(public firebaseAuth: AngularFireAuth,public userService: FirebaseService, public firebaseCrud: ClientService, public router: Router, private mapService: MapService) { }

  ngOnInit(): void {
    this.loadingEdit = true

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit Client"
      this.firebaseCrud.getOneClient(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.clientObject = {

          Category: client.Category,
          ClientEmail: client.ClientEmail,
          ClientName: client.ClientName,
          ContactName: client.ContactName,
          MobileNum: client.MobileNum,
          PhoneNum: client.PhoneNum,
          faxNum: client.faxNum,
          ClientAddress: client.ClientAddress,
          Latitude: client.Latitude,
          Longitude: client.Longitude,
          PsLocation: client.PsLocation,
          Zone: client.Zone,
          recordStatus: "active"


        }
      })

    } else {
      this.status = "New Client"
      this.loadingEdit = false

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

      this.clientObject.Latitude = event.lngLat.lat.toFixed(6)
      this.clientObject.Longitude = event.lngLat.lng.toFixed(6)
      this.checkZone(this.clientObject.Longitude, this.clientObject.Latitude)
    })

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.marker1.setLngLat([this.clientObject.Longitude, this.clientObject.Latitude])
        .addTo(this.map);
    }

    this.checkZone(this.clientObject.Longitude, this.clientObject.Latitude)
  }

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates

    })
  }
  ValidateEmail() {
    this.clientObject.ClientEmail.match(this.mailformat) ? this.cemail = false : this.cemail = true;

  }

  checkZone(lng, lat) {
    var pt = turf.point([lng, lat]);
    this.dropdown.forEach(zoneS => {
      var poly = turf.polygon(JSON.parse(zoneS.coords));
      if (turf.booleanPointInPolygon(pt, poly)) {
        // console.log(zoneS.region);
        this.clientObject.Zone = zoneS.region
        // console.log(turf.booleanPointInPolygon(pt, poly));
      }
    });

  }

  submit() {
    const actionCodeSettings = {
      url:'http://localhost:4200/Dashboard',
      handleCodeInApp:true
  };
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
          this.firebaseCrud.updateClient(new URLSearchParams(window.location.search).get("edit"), this.clientObject).then(
            () => {
              Swal.fire('Client data edited!', '', 'success')
              this.router.navigate(["Clients"]);

            }
          )
        } else {
         
          this.firebaseCrud.createNewClient(this.clientObject).then(
            (user) => {
              this.currentUser = {
                id:user.id,
                fname: this.clientObject.ClientName,
                lname: "",
                email: this.clientObject.ClientEmail,
                num: this.clientObject.MobileNum,
                nic: null,
                address: this.clientObject.ClientAddress,
                zome: this.clientObject.Zone,
                latitude: this.clientObject.Latitude,
                longitude: this.clientObject.Longitude,
                role:"Guard"
              }
              this.userService.createNewUser(this.currentUser).then(() => {
                this.firebaseAuth.sendSignInLinkToEmail(this.currentUser.email,actionCodeSettings).catch((err)=>console.log(err));
                Swal.fire('Client data saved!', '', 'success')
                this.router.navigate(["Clients"]);
              })
            }
          )

        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../../services/map/map.service';
import { GeoJson } from '../../../../model/map/map'
import * as turf from '@turf/turf';

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


  clientObject = {
    Category: null,
    ClientEmail: null,
    ClientName: '',
    ContactName: null,
    MobileNum: null,
    PhoneNum: null,
    faxNum: null,
    ClientAddress: null,
    Latitude: '',
    Longitude: '',
    PsLocation: '',
    Zone: null
  }
  New: FormGroup;
  GuardL = [{
    ID: '17',
    Name: 'a',
  }, {
    ID: '37',
    Name: 'GasdTX',
  }, {
    ID: '67',
    Name: 'rerg',
  }];


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
  constructor(public firebaseCrud: ClientService, public router: Router, private mapService: MapService) { }

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
    Zone: client.Zone


        }
      })
      
    } else {
      this.status = "New Client"

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
    
    this.loading = true;
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.firebaseCrud.updateClient(new URLSearchParams(window.location.search).get("edit"), this.clientObject).then(
        () => {
          alert("Client Edit")// add sweet alert
        }
      )
    } else {

      this.firebaseCrud.createNewClient(this.clientObject).then(
        () => {
          alert("Client Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["Clients"]);

    // console.log(this.clientObject);
    
  }
  getURL() {

    (new URLSearchParams(window.location.search).has("edit")) ? alert("The URL of this page is: " + new URLSearchParams(window.location.search).get("edit")) : alert("add");
  }
}

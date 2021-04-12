import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../../services/map/map.service';
import { GeoJson, FeatureCollection } from '../../../../model/map/map'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
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
    PsLocation: ''
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

        }
      })
    } else {
      this.status = "New Client"
    }
    if (new URLSearchParams(window.location.search).has("edit")) {
      setTimeout(() => {
        this.New = new FormGroup({
          ClientName: new FormControl(this.clientObject.ClientName, [Validators.required]),
          ClientEmail: new FormControl(this.clientObject.ClientEmail, [Validators.required]),
          ContactName: new FormControl(this.clientObject.ContactName, [Validators.required]),
          MobileNum: new FormControl(this.clientObject.MobileNum, [Validators.required]),
          PhoneNum: new FormControl(this.clientObject.PhoneNum, [Validators.required]),
          faxNum: new FormControl(this.clientObject.faxNum, [Validators.required]),
          ClientAddress: new FormControl(this.clientObject.ClientAddress, [Validators.required]),
          Category: new FormControl(this.clientObject.Category, [Validators.required])


        });
        this.loadingEdit = false
      }, 5100);
    } else {
      this.loadingEdit = false

    }
    this.New = new FormGroup({
      ClientName: new FormControl(this.clientObject.ClientName, [Validators.required]),
      ClientEmail: new FormControl(this.clientObject.ClientEmail, [Validators.required]),
      ContactName: new FormControl(this.clientObject.ContactName, [Validators.required]),
      MobileNum: new FormControl(this.clientObject.MobileNum, [Validators.required]),
      PhoneNum: new FormControl(this.clientObject.PhoneNum, [Validators.required]),
      faxNum: new FormControl(this.clientObject.faxNum, [Validators.required]),
      ClientAddress: new FormControl(this.clientObject.ClientAddress, [Validators.required]),
      Category: new FormControl(this.clientObject.Category, [Validators.required])


    });
    console.log(this.clientObject);

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initializeMap()

  }
  private initializeMap() {


    this.buildMap()
  }



  buildMap() {
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
    })




  }

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates

    })
  }



  submit() {
    this.loading = true;
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.firebaseCrud.updateClient(new URLSearchParams(window.location.search).get("edit"), this.New.value).then(
        () => {
          alert("Client Edit")// add sweet alert
        }
      )
    } else {

      this.firebaseCrud.createNewClient(this.New.value).then(
        () => {
          alert("Client Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["Clients"]);
  }
  getURL() {

    (new URLSearchParams(window.location.search).has("edit")) ? alert("The URL of this page is: " + new URLSearchParams(window.location.search).get("edit")) : alert("add");
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/services/guard/guard.service';
import { FirebaseService } from 'src/services/firebase.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../services/map/map.service';
import { GeoJson } from '../../../model/map/map'
@Component({
  selector: 'app-new-guard',
  templateUrl: './new-guard.component.html',
  styleUrls: ['./new-guard.component.css']
})
export class NewGuardComponent implements OnInit {
  status = null
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

  color: ThemePalette = 'primary';
  isChecked = true
  loading = false;
  datePickerId = new Date().toISOString().split("T")[0];
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
  guardObject = {
    ClientNameData: null,
    ClientEmailData: null,
    ContactNameData: null,
    MobileNumData: null,
    PhoneNumData: null,
    faxNumData: null,
    ClientAddressData: null,
    LatitudeData: null,
    LongitudeData: null,
    CategoryData: null

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

  constructor(public firebaseCrud: GuardService, public router: Router, private mapService: MapService) { }

  ngOnInit(): void {
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit Guard"
      this.firebaseCrud.getOneGuard(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.guardObject = {
          CategoryData: client.Category,
          ClientEmailData: client.ClientEmail,
          ClientNameData: client.ClientName,
          ContactNameData: client.ContactName,
          MobileNumData: client.MobileNum,
          PhoneNumData: client.PhoneNum,
          faxNumData: client.faxNum,
          ClientAddressData: client.ClientAddress,
          LatitudeData: client.Latitude,
          LongitudeData: client.Longitude,

        }
      })
    } else {
      this.status = "New Guard"
    }
    if (new URLSearchParams(window.location.search).has("edit")) {

      setTimeout(() => {

        this.New = new FormGroup({
          ClientName: new FormControl(this.guardObject.ClientNameData, [Validators.required]),
          ClientEmail: new FormControl(this.guardObject.ClientEmailData, [Validators.required]),
          ContactName: new FormControl(this.guardObject.ContactNameData, [Validators.required]),
          MobileNum: new FormControl(this.guardObject.MobileNumData, [Validators.required]),
          PhoneNum: new FormControl(this.guardObject.PhoneNumData, [Validators.required]),
          faxNum: new FormControl(this.guardObject.faxNumData, [Validators.required]),
          ClientAddress: new FormControl(this.guardObject.ClientAddressData, [Validators.required]),
          Category: new FormControl(this.guardObject.CategoryData, [Validators.required]),
          Longitude: new FormControl(this.guardObject.LongitudeData, [Validators.required]),
          Latitude: new FormControl(this.guardObject.LatitudeData, [Validators.required])

        });
        this.loadingEdit = false
      }, 5100);
    } else {
      this.loadingEdit = false

    }
    this.New = new FormGroup({
      ClientName: new FormControl(this.guardObject.ClientNameData, [Validators.required]),
      ClientEmail: new FormControl(this.guardObject.ClientEmailData, [Validators.required]),
      ContactName: new FormControl(this.guardObject.ContactNameData, [Validators.required]),
      MobileNum: new FormControl(this.guardObject.MobileNumData, [Validators.required]),
      PhoneNum: new FormControl(this.guardObject.PhoneNumData, [Validators.required]),
      faxNum: new FormControl(this.guardObject.faxNumData, [Validators.required]),
      ClientAddress: new FormControl(this.guardObject.ClientAddressData, [Validators.required]),
      Category: new FormControl(this.guardObject.CategoryData, [Validators.required]),
      Longitude: new FormControl(this.guardObject.LongitudeData, [Validators.required]),
      Latitude: new FormControl(this.guardObject.LatitudeData, [Validators.required])


    });
  }
  ngAfterViewInit(): void {
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
    // console.log(this.New.value)
    this.loading = true;

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.firebaseCrud.updateGuard(new URLSearchParams(window.location.search).get("edit"), this.New.value).then(
        () => {
          alert("Guard Edit")// add sweet alert
        }
      )
    } else {
      this.firebaseCrud.createNewGuard(this.New.value).then(
        () => {
          alert("Guard Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["Guards"]);

  }
}
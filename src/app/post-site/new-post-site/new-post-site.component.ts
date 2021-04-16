import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../services/map/map.service';
import { GeoJson } from '../../../model/map/map'
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-new-post-site',
  templateUrl: './new-post-site.component.html',
  styleUrls: ['./new-post-site.component.css']
})
export class NewPostSiteComponent implements OnInit {
  status = null
  loading = false;
  isChecked = true
  loadingEdit = true;


  clientObject = {

    Latitude: '',
    Longitude: '',
    PsLocation: ''
  }

  New: FormGroup;
  clientD = [];
  client = [{
    ID: '1',
    Name: 'a',
  }, {
    ID: '3',
    Name: 'GasdTX',
  }, {
    ID: '6',
    Name: 'rerg',
  }];
  PostSiteL = [{
    ID: '3',
    Name: 'a',
  }, {
    ID: '33',
    Name: 'GasdTX',
  }, {
    ID: '63',
    Name: 'rerg',
  }];
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
  color: ThemePalette = 'primary';

  markers: any;
  dropdown: any = []
  marker1 = new mapboxgl.Marker({ draggable: true, color: "#d02922" })
  constructor(public firebaseCrud: PostSiteService, public router: Router,  private mapService: MapService) { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ClientName: new FormControl(null, [Validators.required]),
      PostSite: new FormControl(null, [Validators.required]),
      ContactName: new FormControl(null, [Validators.required]),
      MobileNum: new FormControl(null, [Validators.required]),
      PhoneNum: new FormControl(null, [Validators.required]),
      faxNum: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
      ClientEmail: new FormControl(null, [Validators.required]),
      ClientAddress: new FormControl(null, [Validators.required]),
    });


    this.firebaseCrud.getClient().subscribe((clients: any) => {
      clients.forEach(client => {
        let clientData: any = {};
        clientData.id = client.ClientID;
        clientData.Name = client.ClientName;
        this.clientD.push(clientData);



      });
      console.log(this.clientD);

    })



  }
  ngAfterViewInit(): void {
    this.initializeMap()

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

    this.firebaseCrud.createNewPostSite(this.New.value).then(
      () => {
        alert("PostSite Added")// add sweet alert
      }
    )
  }



}

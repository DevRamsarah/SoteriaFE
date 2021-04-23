import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../../services/map/map.service';
import { GeoJson } from '../../../model/map/map'
import { ThemePalette } from '@angular/material/core';
import * as turf from '@turf/turf';
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

  postSiteObject = {
    
    ClientName: null,
    ContactName: null,
    MobileNum: null,
    PhoneNum: null,
    faxNum: null,
    Category: null,
    ClientEmail: null,
    ClientAddress: null,  
    Latitude: '',
    Longitude: '',
    PsLocation: '',
    Zone: null,
    recordStatus: "active"

 


  }


  New: FormGroup;
  clientD = [];


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
    this.loadingEdit = true

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit PostSite"
      this.firebaseCrud.getOnePostSite(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.postSiteObject = {

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
      this.status = "New PostSite"

    }
    setTimeout(() => {
      this.loadingEdit = false

    }, 3500);
    setTimeout(() => {
      this.initializeMap()

    }, 4000);
    this.firebaseCrud.getClient().subscribe((clients: any) => {
      clients.forEach(client => {
        let clientData: any = {};
        clientData.id = client.ClientID;
        clientData.Name = client.ClientName;
        this.clientD.push(clientData);



      });
      console.log(this.clientD);

    })
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
      this.postSiteObject.Latitude = event.lngLat.lat.toFixed(6)
      this.postSiteObject.Longitude = event.lngLat.lng.toFixed(6)
      this.checkZone(this.postSiteObject.Longitude, this.postSiteObject.Latitude)
    })

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.marker1.setLngLat([this.postSiteObject.Longitude, this.postSiteObject.Latitude])
        .addTo(this.map);
    }

    this.checkZone(this.postSiteObject.Longitude, this.postSiteObject.Latitude)
  }

  checkZone(lng, lat) {
    var pt = turf.point([lng, lat]);
    this.dropdown.forEach(zoneS => {
      var poly = turf.polygon(JSON.parse(zoneS.coords));
      if (turf.booleanPointInPolygon(pt, poly)) {
        // console.log(zoneS.region);
        this.postSiteObject.Zone = zoneS.region
        // console.log(turf.booleanPointInPolygon(pt, poly));
      }
    });

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
      this.firebaseCrud.updatePostSite(new URLSearchParams(window.location.search).get("edit"), this.postSiteObject).then(
        () => {
          alert("PostSite Edit")// add sweet alert
        }
      )
    } else {

      this.firebaseCrud.createNewPostSite(this.postSiteObject).then(
        () => {
          alert("PostSite Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["PostSite"]);

    console.log(this.postSiteObject);
    
  }



}

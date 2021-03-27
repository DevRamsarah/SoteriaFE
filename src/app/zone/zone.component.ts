import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../../services/map/map.service';
import { GeoJson, FeatureCollection } from '../../model/map/map'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
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
  New: FormGroup;
  markers: any;
  zoneA: any
  dropdown: any = ["All"]

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ZoneName: new FormControl(null, [Validators.required])
    })

    this.mapService.getAllZone().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        (this.dropdown.includes(doc.data().region)) ? null : this.dropdown.push(doc.data().region)
      });
      console.log(this.dropdown);

    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    this.initializeMap()
  }


  private initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      })
    }


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
    this.map.addControl(new mapboxgl.NavigationControl());

    let draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(draw);


    //add marker to map and database
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, { message: this.message })

    })

    // load map event

    this.map.on('load', (event) => {
      var marker1 = new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .addTo(this.map);



      this.map.on('draw.create', function (e) {

        var userPolygon = e.features[0];
        let point = turf.getCoords(userPolygon);

        console.log(JSON.stringify(point));
        sessionStorage.setItem("Zone", JSON.stringify(point));
        // this.zoneA = JSON.stringify(point)

        // this.zoneA = point
        point.forEach(element => {

          // this.mapService.createZone("coords").then(
          //   () => {
          //     console.log("Add coords");

          //   }
          // )

          // this.zoneA.push(element)
          // console.log(element[0][0]);
          // this.mapService.createZone(element[0][0]).then(
          //   () => {
          //     console.log("Add coords");

          //   }
          // )
          // console.log(element[1]);
          // console.log(element[2]);
          // console.log(element[3]);
          element.forEach(data => {
            // console.log(data);


            data.forEach(coords => {

              // this.zoneA.push(coords)
              // console.log(coords);

            });

          });

        });

      });

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
    // console.log(JSON.parse(sessionStorage.getItem("Zone")))
    // this.loading = true;
    // console.log(this.New.value);

    this.mapService.createZone(sessionStorage.getItem("Zone"), this.New.value.ZoneName).then(
      () => {
        alert("Zone Added")// add sweet alert
      }
    )
    // this.router.navigate(["Clients"]);
    sessionStorage.removeItem('Zone');

  }
}

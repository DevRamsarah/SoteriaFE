import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../../../services/map/map.service';
import { GeoJson, FeatureCollection } from '../../../model/map/map'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent implements OnInit {
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
  dropdown: any = []
  marker1 = new mapboxgl.Marker({ draggable: true, color: "#d02922" })
  constructor(private mapService: MapService) { }

  ngOnInit(): void {

    this.New = new FormGroup({
      ZoneName: new FormControl(null, [Validators.required])
    })

    this.mapService.getAllZone().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        this.dropdown.push(doc.data())
      });
      console.log(this.dropdown);
      console.log(this.dropdown[1]);

    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });



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
    this.map.addControl(new mapboxgl.NavigationControl());

    let draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(draw);






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
    this.dropdown.forEach(zoneS => {
      var pt = turf.point([lng, lat]);
      var poly = turf.polygon(JSON.parse(zoneS.coords));
      if (turf.booleanPointInPolygon(pt, poly)) {
        console.log(zoneS.region);
        // console.log(turf.booleanPointInPolygon(pt, poly));
      }
    });

  }

  submit() {

    this.mapService.createZone(sessionStorage.getItem("Zone"), this.New.value.ZoneName).then(
      () => {
        alert("Zone Added")// add sweet alert
      }
    )
    sessionStorage.removeItem('Zone');

  }
  displayZone(name, saved_markers) {
    this.map.addSource(name, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': JSON.parse(saved_markers)
        }
      }

    });
    this.map.addLayer({
      'id': name + 1,
      'type': 'fill',
      'source': name,
      'layout': {},
      'paint': {
        'fill-color': get_rand_color(),
        'fill-opacity': 0.5
      }
    });
    this.map.addLayer({
      'id': name,
      'type': 'symbol',
      'source': name,
      'layout': {
        'text-field': name,
        'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Bold'],
        'icon-size': 3
      }
    });

    function get_rand_color() {
      var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
      while (color.length < 6) {
        color = "0" + color;
      }
      return "#" + color;
    }
  };
}

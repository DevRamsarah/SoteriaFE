import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../../services/map/map.service';
import { GeoJson, FeatureCollection } from '../../model/map/map'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  loading = true
  Zone = null
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
  marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
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
      // console.log(this.dropdown[1]);

    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    setTimeout(() => {
      this.loading = false
      this.initializeMap()
    }, 3000);


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
    this.map.addControl(new mapboxgl.NavigationControl());

    let draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(draw);


    this.map.on('click', (event) => {
      this.marker1.remove();
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, { message: this.message })
      // this.mapService.createMarker(newMarker)
      this.marker1.setLngLat(coordinates)
        .addTo(this.map);
      this.checkZone(event.lngLat.lng, event.lngLat.lat)
    })




    this.map.on('load', (event) => {

      this.dropdown.forEach(zoneS => {

        this.displayZone(zoneS.region, zoneS.coords)
        console.log(zoneS);

      });


      this.map.on('draw.create', function (e) {

        var userPolygon = e.features[0];
        let point = turf.getCoords(userPolygon);

        console.log(JSON.stringify(point));
        sessionStorage.setItem("Zone", JSON.stringify(point));

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





  checkZone(lng, lat) {
    this.dropdown.forEach(zoneS => {
      var pt = turf.point([lng, lat]);
      var poly = turf.polygon(JSON.parse(zoneS.coords));
      if (turf.booleanPointInPolygon(pt, poly)) {
        console.log(zoneS.region);
        this.Zone = zoneS.region
      }
    });
  }

  submit() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.mapService.createZone(sessionStorage.getItem("Zone"), this.New.value.ZoneName).then(
          () => {
            Swal.fire('Zone Saved!', '', 'success')
          }
        )
        sessionStorage.removeItem('Zone');

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


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

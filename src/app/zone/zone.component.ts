import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../services/map/map.service';
import { GeoJson, FeatureCollection } from '../../model/map/map'


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World';

  source: any;
  markers: any;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.markers = this.mapService.getMarkers()
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
      zoom: 13,
      center: [this.lng, this.lat]

    })

    //add navigation control to map 
    this.map.addControl(new mapboxgl.NavigationControl());

    //add marker to map and database
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, { message: this.message })
      this.mapService.createMarker(newMarker)
      var marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(this.map);
    })

    // load map event

    this.map.on('load', (event) => {
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          feature: []
        }
      });

      //get source

      this.source = this.map.getSource('firebase')

      //subcribe to database and set source 
      this.markers.subscribe(markers => {
        let data = new FeatureCollection(markers)
        this.source.setData(data)
      })

      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]

        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2,
        }
      })
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
}

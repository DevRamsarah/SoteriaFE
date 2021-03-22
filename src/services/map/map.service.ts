import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';

import { GeoJson } from '../../model/map/map'
import * as mapboxgl from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  getMarkers() {
    // return this.db.list('/markers')
  }

  createMarker(data: GeoJson) {
    // return this.db.list('/marker')
    //   .push(data)
  }

  removeMarker($key: string) {
    // return this.db.object('/markers/' + $key).remove()
  }
}

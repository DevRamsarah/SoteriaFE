import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';
import * as geofirestore from 'geofirestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GeoJson } from '../../model/map/map'
import * as mapboxgl from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  firestore = firebase.firestore();
  GeoFirestore = geofirestore.initializeApp(this.firestore);
  geocollection = this.GeoFirestore.collection('Zone');

  constructor(public firebaseCrud: AngularFirestore) {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'
  }



  getAllZone() {
    return this.firestore.collection('Zone')
      .get()

  }
  getZone(region) {
    return this.firestore.collection('Zone')
      .where("region", "==", region)
      .get()

  }
  createZone(data, region) {
    return this.firebaseCrud.collection('Zone').add({
      region: region,
      coords: data
    })
    // return this.geocollection.add({

    //   coordinates: new firebase.firestore.GeoPoint(40.7589, -73.9851)
    // })
  }

  removeMarker($key: string) {
    // return this.db.object('/markers/' + $key).remove()
  }
}

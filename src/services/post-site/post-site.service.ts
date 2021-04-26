import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostSiteService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewPostSite(records) {
    return this.firebaseCrud.collection('postSite').add(records)
  }
  getPostSite() {
    return this.firebaseCrud.collection('postSite').valueChanges({ idField: 'PostSiteID' })

  }
  getOnePostSite(id) {
    return this.firebaseCrud.collection('postSite').doc(id).valueChanges();

  }
  updatePostSite(id, data) {
    return this.firebaseCrud.collection('postSite').doc(id).set(data);
  }
  updateStatus(id, data) {
    return this.firebaseCrud.collection('postSite').doc(id).update({"recordStatus": data});
  }
  deletePostSite(id) {
    return this.firebaseCrud.collection('postSite').doc(id).delete();
  }

  getClient() {
    return this.firebaseCrud.collection('clients').valueChanges({ idField: 'ClientID' })
  }

}

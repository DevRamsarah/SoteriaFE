import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewDispatchTicket(records) {
    return this.firebaseCrud.collection('dispatcher').add(records)
  }
  getDispatch() {
    return this.firebaseCrud.collection('dispatcher').valueChanges({ idField: 'DispatcherID' })

  }
  updateDispatch(id, data) {
    return this.firebaseCrud.collection('dispatcher').doc(id).set(data);
  }

  deleteDispatch(id) {
    return this.firebaseCrud.collection('dispatcher').doc(id).delete();
  }
}

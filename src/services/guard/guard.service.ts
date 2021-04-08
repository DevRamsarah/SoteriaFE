import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewGuard(records) {
    return this.firebaseCrud.collection('employees').add(records)
  }
  getGuard() {
    return this.firebaseCrud.collection('employees').valueChanges({ idField: 'GuardID' })

  }
  getOneGuard(id) {
    return this.firebaseCrud.collection('employees').doc(id).valueChanges();

  }
  updateGuard(id, data) {
    return this.firebaseCrud.collection('employees').doc(id).set(data);
  }

  deleteGuard(id) {
    return this.firebaseCrud.collection('employees').doc(id).delete();
  }
}

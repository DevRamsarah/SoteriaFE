import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewClient(records) {
    return this.firebaseCrud.collection('clients').add(records)
  }
  getClient() {
    return this.firebaseCrud.collection('clients').valueChanges({ idField: 'ClientID' })

  }
  getOneClient(id) {
    return this.firebaseCrud.collection('clients').doc(id).valueChanges();

  }
  updateClient(id, data) {
    return this.firebaseCrud.collection('clients').doc(id).set(data);
  }

  deleteClient(id) {
    return this.firebaseCrud.collection('clients').doc(id).delete();
  }
}

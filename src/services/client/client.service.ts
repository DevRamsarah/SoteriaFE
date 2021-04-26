import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public firebaseCrud: AngularFirestore) { }

  createNewClient(records) {
    this.firebaseCrud.collection('postSite').add(records)
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
  updateStatus(id, data) {
    return this.firebaseCrud.collection('clients').doc(id).update({"recordStatus": data});
  }
  deleteClient(id) {
    return this.firebaseCrud.collection('clients').doc(id).delete();
  }
  getStats(dateFrom, dateTo) {

    return this.firebaseCrud.collection('clients').valueChanges({ idField: 'ClientID' })
  }
}

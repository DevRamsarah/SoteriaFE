import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewScheduler(records) {
    return this.firebaseCrud.collection('Schedulers').add(records)
  }
  getScheduler() {
    return this.firebaseCrud.collection('Schedulers').valueChanges({ idField: 'SchedulerID' })

  }
  getOneScheduler(id) {
    return this.firebaseCrud.collection('Schedulers').doc(id).valueChanges();

  }
  updateScheduler(id, data) {
    return this.firebaseCrud.collection('Schedulers').doc(id).set(data);
  }

  deleteScheduler(id) {
    return this.firebaseCrud.collection('Schedulers').doc(id).delete();
  }
  updateStatus(id, data) {
    return this.firebaseCrud.collection('Schedulers').doc(id).update({"recordStatus": data});
  }
  getStats(dateFrom, dateTo) {

    return this.firebaseCrud.collection('Schedulers').valueChanges({ idField: 'SchedulerID' })
  }
}

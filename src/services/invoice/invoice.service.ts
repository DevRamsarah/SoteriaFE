import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public firebaseCrud: AngularFirestore) { }
  createNewInvoice(records) {
    return this.firebaseCrud.collection('Invoices').add(records)
  }
  getInvoice() {
    return this.firebaseCrud.collection('Invoices').valueChanges({ idField: 'InvoiceID' })

  }
  getOneInvoice(id) {
    return this.firebaseCrud.collection('Invoices').doc(id).valueChanges();

  }
  updateInvoice(id, data) {
    return this.firebaseCrud.collection('Invoices').doc(id).set(data);
  }

  deleteInvoice(id) {
    return this.firebaseCrud.collection('Invoices').doc(id).delete();
  }
  getStats(dateFrom, dateTo) {

    return this.firebaseCrud.collection('Invoices').valueChanges({ idField: 'InvoiceID' })
  }
}

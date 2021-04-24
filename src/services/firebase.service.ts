import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false

  constructor(public firebaseAuth: AngularFireAuth, public firebaseCrud: AngularFirestore) { }
  async signin(email: string, password: string) {


    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user)

        this.isLoggedIn = true
        localStorage.setItem('userid', res.user.uid)

      })
      .catch(error => {
        throw error.message
      })

  }
  async signup(email: string,password: string, name:string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

 
      this.createNewUser({
        fname:name,
        email:email,
        id: res.user.uid
      })
        this.isLoggedIn = true
      }) .catch(error => {
        throw error.message
      })
  }

reset(emailAddress){
  this.firebaseAuth.sendPasswordResetEmail(emailAddress).then(function() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Reset link send to your mail : '+ emailAddress,
      showConfirmButton: false,
      timer: 3500
    })
  }).catch(function(error) {
    // An error happened.
  });
}

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
  createNewEmployee(records) {
    return this.firebaseCrud.collection('employees').add(records)
  }
  getClient() {
    return this.firebaseCrud.collection('employees').valueChanges()
  }
  


  createNewUser(records) {
    return this.firebaseCrud.collection('users').add(records)
  }

  getOneUser(id) {
    return this.firebaseCrud.collection('users').doc(id).valueChanges();

  }
  updateUser(id, data) {
    return this.firebaseCrud.collection('users').doc(id).set(data);
  }
  updateStatus(id, data) {
    return this.firebaseCrud.collection('users').doc(id).update({"recordStatus": data});
  }
  deleteUser(id) {
    return this.firebaseCrud.collection('users').doc(id).delete();
  }
  getStats(dateFrom, dateTo) {

    return this.firebaseCrud.collection('users').valueChanges({ idField: 'UserID' })
  }
}


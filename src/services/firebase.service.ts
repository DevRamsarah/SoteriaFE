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
        console.log(res.user.uid)

        this.isLoggedIn = true
        localStorage.setItem('userid', res.user.uid)
        localStorage.setItem('userName', res.user.displayName)
        localStorage.setItem('userEmail', res.user.email)

      })
      .catch(error => {
        throw error.message
      })
;(await this.firebaseAuth.currentUser).updateProfile({
  displayName:localStorage.getItem('userNameR')
})
  }
  async signup(email: string,password: string, name:string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        console.log(res)
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('userNameR', name)
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
}


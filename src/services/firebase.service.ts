import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'

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
  }
  async signup(email: string, name: string, age: number, address: string, tel: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        console.log(res)
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
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


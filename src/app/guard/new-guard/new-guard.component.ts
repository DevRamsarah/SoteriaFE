import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-new-guard',
  templateUrl: './new-guard.component.html',
  styleUrls: ['./new-guard.component.css']
})
export class NewGuardComponent implements OnInit {
  color: ThemePalette = 'primary';
  isChecked = false
  loading = false;
  datePickerId = new Date().toISOString().split("T")[0];
  New: FormGroup;
  GuardL = [{
    ID: '17',
    Name: 'a',
  }, {
    ID: '37',
    Name: 'GasdTX',
  }, {
    ID: '67',
    Name: 'rerg',
  }];

  constructor(public firebaseCrud: ClientService, public router: Router) { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ClientName: new FormControl(null, [Validators.required]),
      ClientEmail: new FormControl(null, [Validators.required]),
      ContactName: new FormControl(null, [Validators.required]),
      MobileNum: new FormControl(null, [Validators.required]),
      PhoneNum: new FormControl(null, [Validators.required]),
      faxNum: new FormControl(null, [Validators.required]),
      ClientAddress: new FormControl(null, [Validators.required]),
      Latitude: new FormControl(null, [Validators.required]),
      Longitude: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required])


    });
  }
  submit() {
    // console.log(this.New.value)
    this.loading = true;

    this.firebaseCrud.createNewClient(this.New.value).then(
      () => {
        alert("Client Added")// add sweet alert
      }
    )
    this.router.navigate(["Clients"]);

  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/services/guard/guard.service';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-new-guard',
  templateUrl: './new-guard.component.html',
  styleUrls: ['./new-guard.component.css']
})
export class NewGuardComponent implements OnInit {
  loadingEdit = true;
  status = null
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
  guardObject = {
    ClientNameData: null,
    ClientEmailData: null,
    ContactNameData: null,
    MobileNumData: null,
    PhoneNumData: null,
    faxNumData: null,
    ClientAddressData: null,
    LatitudeData: null,
    LongitudeData: null,
    CategoryData: null

  }
  constructor(public firebaseCrud: GuardService, public router: Router) { }

  ngOnInit(): void {
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit Guard"
      this.firebaseCrud.getOneGuard(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.guardObject = {
          CategoryData: client.Category,
          ClientEmailData: client.ClientEmail,
          ClientNameData: client.ClientName,
          ContactNameData: client.ContactName,
          MobileNumData: client.MobileNum,
          PhoneNumData: client.PhoneNum,
          faxNumData: client.faxNum,
          ClientAddressData: client.ClientAddress,
          LatitudeData: client.Latitude,
          LongitudeData: client.Longitude,

        }
      })
    } else {
      this.status = "New Guard"
    }

    setTimeout(() => {

      this.New = new FormGroup({
        ClientName: new FormControl(this.guardObject.ClientNameData, [Validators.required]),
        ClientEmail: new FormControl(this.guardObject.ClientEmailData, [Validators.required]),
        ContactName: new FormControl(this.guardObject.ContactNameData, [Validators.required]),
        MobileNum: new FormControl(this.guardObject.MobileNumData, [Validators.required]),
        PhoneNum: new FormControl(this.guardObject.PhoneNumData, [Validators.required]),
        faxNum: new FormControl(this.guardObject.faxNumData, [Validators.required]),
        ClientAddress: new FormControl(this.guardObject.ClientAddressData, [Validators.required]),
        Category: new FormControl(this.guardObject.CategoryData, [Validators.required]),
        Longitude: new FormControl(this.guardObject.LongitudeData, [Validators.required]),
        Latitude: new FormControl(this.guardObject.LatitudeData, [Validators.required])

      });
      this.loadingEdit = false
    }, 5100);
    this.New = new FormGroup({
      ClientName: new FormControl(this.guardObject.ClientNameData, [Validators.required]),
      ClientEmail: new FormControl(this.guardObject.ClientEmailData, [Validators.required]),
      ContactName: new FormControl(this.guardObject.ContactNameData, [Validators.required]),
      MobileNum: new FormControl(this.guardObject.MobileNumData, [Validators.required]),
      PhoneNum: new FormControl(this.guardObject.PhoneNumData, [Validators.required]),
      faxNum: new FormControl(this.guardObject.faxNumData, [Validators.required]),
      ClientAddress: new FormControl(this.guardObject.ClientAddressData, [Validators.required]),
      Category: new FormControl(this.guardObject.CategoryData, [Validators.required]),
      Longitude: new FormControl(this.guardObject.LongitudeData, [Validators.required]),
      Latitude: new FormControl(this.guardObject.LatitudeData, [Validators.required])


    });
  }
  submit() {
    // console.log(this.New.value)
    this.loading = true;

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.firebaseCrud.updateGuard(new URLSearchParams(window.location.search).get("edit"), this.New.value).then(
        () => {
          alert("Guard Edit")// add sweet alert
        }
      )
    } else {
      this.firebaseCrud.createNewGuard(this.New.value).then(
        () => {
          alert("Guard Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["Guards"]);

  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  status = null
  loading = false;
  loadingEdit = true;
  clientObject = {
    CategoryData: "null",
    ClientEmailData: null,
    ClientNameData: null,
    ContactNameData: null,
    MobileNumData: null,
    PhoneNumData: null,
    faxNumData: null,
    ClientAddressData: "lakaz"
  }
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
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.status = "Edit Client"
      this.firebaseCrud.getOneClient(new URLSearchParams(window.location.search).get("edit")).subscribe((client: any) => {
        this.clientObject = {

          CategoryData: client.Category,
          ClientEmailData: client.ClientEmail,
          ClientNameData: client.ClientName,
          ContactNameData: client.ContactName,
          MobileNumData: client.MobileNum,
          PhoneNumData: client.PhoneNum,
          faxNumData: client.faxNum,
          ClientAddressData: client.ClientAddress

        }
        console.log(client);
        console.log(this.clientObject);

      })
    } else {
      this.status = "New Client"
    }

    setTimeout(() => {
      this.New = new FormGroup({
        ClientName: new FormControl(this.clientObject.ClientNameData, [Validators.required]),
        ClientEmail: new FormControl(this.clientObject.ClientEmailData, [Validators.required]),
        ContactName: new FormControl(this.clientObject.ContactNameData, [Validators.required]),
        MobileNum: new FormControl(this.clientObject.MobileNumData, [Validators.required]),
        PhoneNum: new FormControl(this.clientObject.PhoneNumData, [Validators.required]),
        faxNum: new FormControl(this.clientObject.faxNumData, [Validators.required]),
        ClientAddress: new FormControl(this.clientObject.ClientAddressData, [Validators.required]),
        Category: new FormControl(this.clientObject.CategoryData, [Validators.required])

      });
      this.loadingEdit = false
    }, 5100);
    this.New = new FormGroup({
      ClientName: new FormControl(this.clientObject.ClientNameData, [Validators.required]),
      ClientEmail: new FormControl(this.clientObject.ClientEmailData, [Validators.required]),
      ContactName: new FormControl(this.clientObject.ContactNameData, [Validators.required]),
      MobileNum: new FormControl(this.clientObject.MobileNumData, [Validators.required]),
      PhoneNum: new FormControl(this.clientObject.PhoneNumData, [Validators.required]),
      faxNum: new FormControl(this.clientObject.faxNumData, [Validators.required]),
      ClientAddress: new FormControl(this.clientObject.ClientAddressData, [Validators.required]),
      Category: new FormControl(this.clientObject.CategoryData, [Validators.required])


    });
    console.log(this.clientObject);

  }
  submit() {
    this.loading = true;
    if (new URLSearchParams(window.location.search).has("edit")) {
      this.firebaseCrud.updateClient(new URLSearchParams(window.location.search).get("edit"), this.New.value).then(
        () => {
          alert("Client Edit")// add sweet alert
        }
      )
    } else {

      this.firebaseCrud.createNewClient(this.New.value).then(
        () => {
          alert("Client Added")// add sweet alert
        }
      )
    }
    this.router.navigate(["Clients"]);
  }
  getURL() {

    (new URLSearchParams(window.location.search).has("edit")) ? alert("The URL of this page is: " + new URLSearchParams(window.location.search).get("edit")) : alert("add");
  }
}

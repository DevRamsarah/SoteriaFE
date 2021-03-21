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
  loading = false;

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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DispatcherService } from 'src/services/dispatcher/dispatcher.service';

@Component({
  selector: 'app-new-post-site',
  templateUrl: './new-post-site.component.html',
  styleUrls: ['./new-post-site.component.css']
})
export class NewPostSiteComponent implements OnInit {

  New: FormGroup;
  client = [{
    ID: '1',
    Name: 'a',
  }, {
    ID: '3',
    Name: 'GasdTX',
  }, {
    ID: '6',
    Name: 'rerg',
  }];
  PostSiteL = [{
    ID: '3',
    Name: 'a',
  }, {
    ID: '33',
    Name: 'GasdTX',
  }, {
    ID: '63',
    Name: 'rerg',
  }];
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
  constructor(public firebaseCrud: DispatcherService, public router: Router) { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ClientID: new FormControl(null, [Validators.required]),
      PostSite: new FormControl(null, [Validators.required]),
      Guard: new FormControl(null, [Validators.required]),
      Priority: new FormControl(null, [Validators.required]),
      Caller: new FormControl(null, [Validators.required]),
      CallerName: new FormControl(null, [Validators.required]),
      Incident: new FormControl(null, [Validators.required]),
      IncidentDate: new FormControl(null, [Validators.required]),
      IncidentDetail: new FormControl(null, [Validators.required]),
      ActionTaken: new FormControl(null, [Validators.required]),
      InternalNotes: new FormControl(null, [Validators.required]),

    });

  }
  submit() {
    console.log(this.New.value)
    this.firebaseCrud.createNewDispatchTicket(this.New.value)
  }
}

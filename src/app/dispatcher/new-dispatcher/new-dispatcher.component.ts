import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-dispatcher',
  templateUrl: './new-dispatcher.component.html',
  styleUrls: ['./new-dispatcher.component.css']
})
export class NewDispatcherComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ClientID: new FormControl(null, [Validators.required]),

    });

  }
  submit() {
    console.log(this.New)
  }
}

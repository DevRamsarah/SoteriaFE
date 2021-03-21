import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostSiteService } from 'src/services/post-site/post-site.service';

@Component({
  selector: 'app-new-post-site',
  templateUrl: './new-post-site.component.html',
  styleUrls: ['./new-post-site.component.css']
})
export class NewPostSiteComponent implements OnInit {
  loading = false;

  New: FormGroup;
  clientD = [];
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
  constructor(public firebaseCrud: PostSiteService, public router: Router) { }

  ngOnInit(): void {
    this.New = new FormGroup({
      ClientName: new FormControl(null, [Validators.required]),
      PostSite: new FormControl(null, [Validators.required]),
      ContactName: new FormControl(null, [Validators.required]),
      MobileNum: new FormControl(null, [Validators.required]),
      PhoneNum: new FormControl(null, [Validators.required]),
      faxNum: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
      ClientEmail: new FormControl(null, [Validators.required]),
      ClientAddress: new FormControl(null, [Validators.required]),
    });


    this.firebaseCrud.getClient().subscribe((clients: any) => {
      clients.forEach(client => {
        let clientData: any = {};
        clientData.id = client.ClientID;
        clientData.Name = client.ClientName;
        this.clientD.push(clientData);



      });
      console.log(this.clientD);

    })



  }


  submit() {
    // console.log(this.New.value)
    this.loading = true;

    this.firebaseCrud.createNewPostSite(this.New.value).then(
      () => {
        alert("PostSite Added")// add sweet alert
      }
    )
  }



}

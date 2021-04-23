import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DispatcherService } from 'src/services/dispatcher/dispatcher.service';
import { ClientService } from 'src/services/client/client.service';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GuardService } from 'src/services/guard/guard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-dispatcher',
  templateUrl: './new-dispatcher.component.html',
  styleUrls: ['./new-dispatcher.component.css']
})
export class NewDispatcherComponent implements OnInit {
  New: FormGroup;

  prioL = [{
    Name: 'High',
  }, {
    Name: 'Medium',
  }, {
    Name: 'Low',
  }];
  ClientE= ""
  PostSiteE=""
  guardE=""
  status = null
  loading = false;
  loadingEdit = true;
edit=false
  clientD = [];
  guardD=[]
  guardDrop;
  ClientDrop;
  PostSiteDrop;
  PostSiteD = []

  invoiceObject= {
    ClientID: "",
    PostSite: "",
    Guard: "",
    Priority: "",
    Incident: "",
    IncidentDate: null,
    IncidentDetail: "",
    ActionTaken: "",
    InternalNotes: "",
    status:"inactive",
    recordStatus: "active"
  }
  constructor(public firebaseCrud: DispatcherService,
    public fire: AngularFirestore,public cli: ClientService
    ,public guardCRUD: GuardService,public router: Router
    ,public psCrud: PostSiteService,) { }

  ngOnInit(): void {
    this.loadingEdit = true

    if (new URLSearchParams(window.location.search).has("edit")) {
      this.edit=true
      this.status = "Edit Dispatch"
      this.firebaseCrud.getOneDispatch(new URLSearchParams(window.location.search).get("edit")).subscribe((dispatch: any) => {
        this.invoiceObject= {
          ClientID: dispatch.ClientID,
          PostSite: dispatch.PostSite,
          Guard: dispatch.Guard,
          Priority: dispatch.Priority,
          Incident: dispatch.Incident,
          IncidentDate: dispatch.IncidentDate,
          IncidentDetail: dispatch.IncidentDetail,
          ActionTaken: dispatch.ActionTaken,
          InternalNotes: dispatch.InternalNotes,
          status:"inactive",
          recordStatus: "active"
 
        }
        console.log(dispatch);
        
        this.ClientE=dispatch.ClientID
        this.PostSiteE=dispatch.PostSite
        this.guardE=dispatch.Guard
      })

    } else {
      this.status = "New Dispatch"
      this.loadingEdit = false

    }
    
    setTimeout(() => {
      this.loadingEdit = false

    }, 3500);
    this.cli.getClient().subscribe((clients: any) => {
      clients.forEach(client => {
        let clientData: any = {};
        clientData.id = client.ClientID;
        clientData.Name = client.ClientName;
        this.clientD.push(clientData);



      });
      console.log(this.clientD);

    })

    this.guardCRUD.getGuard().subscribe((Guards: any) => {
      Guards.forEach(Guard => {
        let GuardData: any = {};
        GuardData.id = Guard.ClientID;
        GuardData.Name = Guard.fname +" "+ Guard.lname;
        this.guardD.push(GuardData);



      });
    });

  }

  getClientDrop($event) {

console.log(this.ClientDrop);

    this.PostSiteD = []

    this.fire.collection('postSite', ref => ref.where("ClientName", "==", this.ClientDrop)).valueChanges({ idField: 'PostSiteID' })
      .subscribe((PostSite: any) => {
        console.log(PostSite);

        PostSite.forEach(ps => {
          let PostSiteData: any = {};
          PostSiteData.id = ps.PostSiteID;
          PostSiteData.Name = ps.PsLocation;
          this.PostSiteD.push(PostSiteData);



        });
        // console.log(this.clientD);

      })



  }
  submit() {
    this.invoiceObject.ClientID= this.ClientDrop
    this.invoiceObject.Guard= this.guardDrop
    this.invoiceObject.PostSite= this.PostSiteDrop
    console.log(this.invoiceObject)
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {

        if (new URLSearchParams(window.location.search).has("edit")) {
          this.firebaseCrud.updateDispatch(new URLSearchParams(window.location.search).get("edit"), this.invoiceObject).then(
            () => {
              Swal.fire('Dispatch data edited!', '', 'success')
              this.router.navigate(["Dispatcher"]);

            }
          )
        } else {
    
          this.firebaseCrud.createNewDispatchTicket(this.invoiceObject).then(
            () => {
              Swal.fire('Dispatch data saved!', '', 'success')
              this.router.navigate(["Dispatcher"]);

            }
          )
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  
  }
}

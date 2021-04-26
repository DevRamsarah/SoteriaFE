import { Component, OnInit } from '@angular/core';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { SchedulerService } from 'src/services/scheduler/scheduler.service';
import { ClientService } from 'src/services/client/client.service';
import { GuardService } from 'src/services/guard/guard.service';
import * as html2pdf from 'html2pdf.js'
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as turf from '@turf/turf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  loading = false;
  minDate: Date;
  maxDate: Date;
  invoice = {
    Title: "",
    Summary: "",
    number: "",
    Currentdate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    arrayDes: [],
    total: 0,
    note: "",
    Clientid: "",
    PostSiteid: "",
    ClientName: "",
    PostSiteName: "",
    recordStatus: "active"


  }
  field = {
    start: null,
    end: null
  }
  psCoordinate = {
    Latitude: null,
    Longitude: null,
    Zone: null
  }

  selectedGuard = []
  guardlist = [turf.point([28.973865, 41.011122], { id: 'a' })]
  clientD = [];
  PostSiteD = []
  postSite = [];
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),

  });

  ClientDrop;
  PostSiteDrop;
  pdf = true
  constructor(public firebaseCrud: PostSiteService, public fire: AngularFirestore,
    public invoiceCRUD: InvoiceService, public router: Router, public cli: ClientService,
    public gua: GuardService,
    public SchedulerCRUD: SchedulerService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();

  }

  ngOnInit(): void {
    this.firebaseCrud.getClient().subscribe((clients: any) => {
      clients.forEach(client => {
        let clientData: any = {};
        clientData.id = client.ClientID;
        clientData.Name = client.ClientName;
        this.clientD.push(clientData);
      });
    })

  }

  download() {
    this.pdf = false

    var element = document.getElementById('print');
    var opt = {
      margin: 1,
      filename: this.invoice.Title + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { orientation: 'portrait' }
    };


    html2pdf().set(opt).from(element).save();
    setTimeout(() => {
      this.pdf = true
    }, 1000);

    html2pdf(element, opt);
  }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.invoice.total = this.invoice.total - this.fieldArray[index].amount
    this.fieldArray.splice(index, 1);
  }
  getChange(event, i) {
    this.fieldArray[i].hours = Math.abs(this.fieldArray[i].end - this.fieldArray[i].start) / 36e5;
    this.fieldArray[i].rate = 0;
    this.fieldArray[i].quatity = 0;
  }
  getAmount(event, i) {
    this.fieldArray[i].amount = this.fieldArray[i].hours * this.fieldArray[i].rate * this.fieldArray[i].quatity;
    this.invoice.total += this.fieldArray[i].amount
  }
  getClientDrop($event) {


    this.PostSiteD = []

    this.fire.collection('postSite', ref => ref.where("ClientName", "==", this.ClientDrop)).valueChanges({ idField: 'PostSiteID' })
      .subscribe((PostSite: any) => {
        PostSite.forEach(ps => {
          let PostSiteData: any = {};
          PostSiteData.id = ps.PostSiteID;
          PostSiteData.Name = ps.PsLocation;
          this.PostSiteD.push(PostSiteData);
        });
      })
  }
  getAddress($event) {
    this.fire.collection('postSite', ref => ref.where("PsLocation", "==", this.PostSiteDrop)).valueChanges()
      .subscribe((PostSite: any) => {
        this.psCoordinate.Latitude = PostSite[0].Latitude
        this.psCoordinate.Longitude = PostSite[0].Longitude
        this.psCoordinate.Zone = PostSite[0].Zone
        this.invoice.Summary = PostSite[0].ClientAddress;
      })
    this.gua.getGuard().subscribe((guards: any) => {
      this.guardlist = [];
      guards.forEach(guard => {
        if (guard.Zone == this.psCoordinate.Zone) {
          this.guardlist.push(turf.point([parseFloat(guard.Longitude), parseFloat(guard.Latitude)],
            {
              id: guard.GuardID,
              name: guard.fname + ' ' + guard.lname,
              Zone: guard.Zone
            })
          )
        }
      })
    })
  }
  generate() {
    this.invoice.arrayDes = this.fieldArray
    this.invoice.Clientid = this.ClientDrop
    this.invoice.PostSiteid = this.PostSiteDrop
    var targetPoint = turf.point([parseFloat(this.psCoordinate.Longitude), parseFloat(this.psCoordinate.Latitude)]);
    for (let index = 0; index < this.invoice.arrayDes[0].quatity; index++) {
      var points = turf.featureCollection(this.guardlist);
      var nearest = turf.nearestPoint(targetPoint, points);
      this.selectedGuard.push(nearest.properties)
      this.guardlist.splice(nearest.properties.featureIndex, 1)
    }
    this.SchedulerCRUD.createNewScheduler(
      {
        start: (this.fieldArray[0].start).toString(),
        end: (this.fieldArray[0].end).toString(),
        guard: this.invoice.arrayDes[0].quatity,
        ArrayGuard: this.selectedGuard,
        title: this.invoice.PostSiteid + "/" + this.invoice.Summary,
        ClientName:this.invoice.Clientid,
        PostSiteName:this.invoice.PostSiteid,
        color: "red",
        actions: "actions",
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
        draggable: false,
      }
    )
    setTimeout(() => {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.invoiceCRUD.createNewInvoice(this.invoice).then(
            () => {
              Swal.fire('Client data edited!', '', 'success')
              this.router.navigate(["Invoicer"]);
            })
        }
      })
    }, 6000);
  }
}

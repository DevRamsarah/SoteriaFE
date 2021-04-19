import { Component, OnInit } from '@angular/core';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { ClientService } from 'src/services/client/client.service';
import * as html2pdf from 'html2pdf.js'
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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
    Currentdate: null,
    dueDate: null,
    arrayDes: [],
    total: 0,
    note: "",
    Clientid: "",
    PostSiteid: "",
    ClientName: "",
    PostSiteName: "",


  }
  field = {}
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
    public invoiceCRUD: InvoiceService, public router: Router, public cli: ClientService) {
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
      // console.log(this.clientD);

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

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
    setTimeout(() => {
      this.pdf = true
    }, 1000);
    // Old monolithic-style usage:
    html2pdf(element, opt);
    // console.log(this.fieldArray);
    // console.log(this.newAttribute);


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
  getAddress($event) {




    this.fire.collection('postSite', ref => ref.where("PsLocation", "==", this.PostSiteDrop)).valueChanges()
      .subscribe((PostSite: any) => {

        
  

          this.invoice.Summary = PostSite[0].ClientAddress;


        // console.log(this.clientD);

      })



  }
  generate() {
    this.invoice.arrayDes = this.fieldArray
    this.invoice.Clientid = this.ClientDrop
    this.invoice.PostSiteid = this.PostSiteDrop
    this.cli.getOneClient(this.ClientDrop).subscribe((client: any) => {
      this.invoice.ClientName = client.ClientName
    })
    this.firebaseCrud.getOnePostSite(this.PostSiteDrop).subscribe((ps: any) => {
      this.invoice.PostSiteName = ps.PostSite
    })





    console.log(this.invoice);

    // this.loading = true;
    //   if (new URLSearchParams(window.location.search).has("edit")) {
    //     this.invoiceCRUD.updateInvoice(new URLSearchParams(window.location.search).get("edit"), this.invoice).then(
    //       () => {
    //         alert("Invoice Edit")// add sweet alert
    //       }
    //     )
    //   } else {
    setTimeout(() => {

      this.invoiceCRUD.createNewInvoice(this.invoice).then(
        () => {
          alert("Invoice Added")// add sweet alert
        }
      )
      // }
      this.router.navigate(["Invoicer"]);
    }, 6000);
  }

}

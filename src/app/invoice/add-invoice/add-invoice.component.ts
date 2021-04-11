import { Component, OnInit } from '@angular/core';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import * as html2pdf from 'html2pdf.js'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  invoice = {
    Title: "",
    Summary: ""
  }
  field = {}
  clientD = [];
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),

  });
  total = 0
  constructor(public firebaseCrud: PostSiteService) {
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
    // var element = document.getElementById('print');
    // var opt = {
    //   margin: 1,
    //   filename: 'invoice.pdf',
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 1 },
    //   jsPDF: { orientation: 'portrait' }
    // };

    // // New Promise-based usage:
    // html2pdf().set(opt).from(element).save();

    // // Old monolithic-style usage:
    // html2pdf(element, opt);
    console.log(this.fieldArray);
    console.log(this.newAttribute);


  }


  addFieldValue() {

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.total = this.total - this.fieldArray[index].amount
    this.fieldArray.splice(index, 1);
  }
  getChange(event, i) {
    this.fieldArray[i].hours = Math.abs(this.fieldArray[i].end - this.fieldArray[i].start) / 36e5;
    this.fieldArray[i].rate = 0;
    this.fieldArray[i].quatity = 0;
  }
  getAmount(event, i) {
    this.fieldArray[i].amount = this.fieldArray[i].hours * this.fieldArray[i].rate * this.fieldArray[i].quatity;
    this.total += this.fieldArray[i].amount
  }

}

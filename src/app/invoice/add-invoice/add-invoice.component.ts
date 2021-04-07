import { Component, OnInit } from '@angular/core';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice = {
    Title: "",
    Summary: ""
  }
  clientD = [];

  constructor(public firebaseCrud: PostSiteService) { }

  ngOnInit(): void {
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

  download() {
    var element = document.getElementById('print');
    var opt = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }
}

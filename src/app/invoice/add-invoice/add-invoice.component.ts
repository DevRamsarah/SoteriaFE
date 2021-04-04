import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit(): void {

  }

}

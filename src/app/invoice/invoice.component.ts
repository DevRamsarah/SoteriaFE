import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { Client } from 'src/model/client/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  edit = false;
  editE = null;
  loading = true;
  active = false;
  data: any;
  data2: any;
  displayedColumns2: string[] = ['number', 'ClientName', 'PostSiteName', 'Currentdate', 'action'];


  dataSource2 = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public firebaseCrud: InvoiceService, public router: Router) { }
  ngOnInit(): void {


    this.firebaseCrud.getInvoice().subscribe((Dispatches: any) => {
      console.log(Dispatches);
      // this.data = Dispatch.filter((client) => client.position === 'Employee');
      this.data2 = Dispatches;

      this.loading = false;

      this.dataSource2 = new MatTableDataSource<Client>(this.data2);

      this.dataSource2.paginator = this.paginator;
    })


  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
  }
  change(x) {
    this.edit = (this.edit == false ? true : false);
    this.editE = (this.edit == true ? x : null);
  }
  active2(x) {
    this.dataSource2.data = x;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }
  new() {
    this.router.navigate(["Invoicer/New-invoice"]);
  }


}




import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuardService } from 'src/services/guard/guard.service';



export interface Client {
  fname: string;
  lname: string;
  email: string;
  nid: string;
}


@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css']
})
export class GuardComponent implements AfterViewInit, OnInit {
  loading = true;
  active = false;
  data: any;
  data2: any;
  displayedColumns2: string[] = ['fname', 'lname', 'Email', 'nid', 'action'];
  dataSource2 = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public firebaseCrud: GuardService) { }
  ngOnInit(): void {


    this.firebaseCrud.getGuard().subscribe((Clients: any) => {
      console.log(Clients);
      // this.data = Clients.filter((client) => client.position === 'Employee');
      this.data2 = Clients;

      this.loading = false;

      this.dataSource2 = new MatTableDataSource<Client>(this.data2);

      this.dataSource2.paginator = this.paginator;
    })


  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
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
  newGuard() {
    window.location.href = "Guards/New-guard"
  }  /** Selects all rows if they are not all selected; otherwise clear selection. */



  editData(id) {
    // console.log(id);

    location.href = "Guards/New-guard/?edit=" + id;
  }
  deleteData(id) {
    this.firebaseCrud.deleteGuard(id).then(
      () => {
        alert("Guard removed")// add sweet alert
      }
    )
  }
}




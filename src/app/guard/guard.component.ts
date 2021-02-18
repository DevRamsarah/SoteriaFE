import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirebaseService } from 'src/services/firebase.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  status: string
}

export interface Client {
  fname: string;
  lname: string;
  email: string;
  position: string;
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
  displayedColumns2: string[] = ['fname', 'lname', 'email', 'position', 'nid', 'action'];
  dataSource2 = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public firebaseCrud: FirebaseService) { }
  ngOnInit(): void {


    this.firebaseCrud.getClient().subscribe((Clients: any) => {
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
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}




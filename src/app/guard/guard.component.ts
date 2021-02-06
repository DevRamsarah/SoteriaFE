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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Erika Schmidt', weight: "683 - 2221", status: "1", symbol: 'luettgen.frances@yahoo.com' },
  { position: 2, name: 'Roel Murray MD', weight: "885 - 7127", status: "1", symbol: 'emilia68@gmail.com' },
  { position: 3, name: 'Abbey Streich ', weight: "835 - 2507", status: "1", symbol: 'carli32@reilly.com' },
  { position: 4, name: 'Rocio Kilback', weight: "443 - 4854", status: "1", symbol: 'tgrant@gmail.com' },
  { position: 5, name: 'Oswald Hickle', weight: "401 - 4539", status: "1", symbol: 'boehm.dannie@windler.com' },
  { position: 6, name: 'Carbon', weight: "12.0107", status: "1", symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: "14.0067", status: "1", symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: "15.9994", status: "1", symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: "18.9984", status: "1", symbol: 'F' },
  { position: 10, name: 'Neon', weight: "20.1797", status: "1", symbol: 'Ne' },
];
const ELEMENT_DATA2: PeriodicElement[] = [

];
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
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['select', 'fname', 'lname', 'email', 'position', 'nid'];
  dataSource2 = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public firebaseCrud: FirebaseService) { }
  ngOnInit(): void {


    this.firebaseCrud.getClient().subscribe((Clients: any) => {
      console.log(Clients);
      this.data = Clients.filter((client) => client.position === 'Employee');
      this.data2 = Clients.filter((client) => client.position === 'Admin');

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




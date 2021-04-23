import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DispatcherService } from 'src/services/dispatcher/dispatcher.service';
import { Dispatcher } from 'src/model/dispatcher/dispatcher.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})
export class DispatcherComponent implements OnInit {
  recStatus=true

  edit = false;
  editE = null;
  loading = true;
  active = false;
  data: any;
  data2: any;
  displayedColumns2: string[] = ['DispatcherID', 'Date', 'ClientID', 'PostSite', 'IncidentType', 'Status', 'action'];


  dataSource2 = new MatTableDataSource<Dispatcher>();
  selection = new SelectionModel<Dispatcher>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public firebaseCrud: DispatcherService, public router: Router) { }
  ngOnInit(): void {


    this.firebaseCrud.getDispatch().subscribe((Dispatches: any) => {
      console.log(Dispatches);
      this.data = Dispatches.filter((client) => client.recordStatus === 'archieve');
      this.data2 = Dispatches.filter((client) => client.recordStatus === 'active');

      this.loading = false;

      this.dataSource2 = new MatTableDataSource<Dispatcher>(this.data2);

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
    this.recStatus?this.recStatus=false:this.recStatus=true;

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
    this.router.navigate(["/Dispatcher/New-dispatcher"]);
  }
  editData(id) {
    location.href = "Dispatcher/New-dispatcher/?edit=" + id;
  }
  deleteData(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebaseCrud.deleteDispatch(id).then(
          () => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
        
      }
    })

  }
  archieve(id) {

    this.firebaseCrud.updateStatus(id,"archieve").then(
      () => {
        alert("Guard archieve")// add sweet alert
      }
    )
  }
  unarchieve(id) {

    this.firebaseCrud.updateStatus(id,"active").then(
      () => {
        alert("Guard active")// add sweet alert
      
      }
    )
  }
}




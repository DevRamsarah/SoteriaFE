import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuardService } from 'src/services/guard/guard.service';
import * as mapboxgl from "mapbox-gl";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../../services/map/map.service';


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
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = -20.23930295803079;
  lng = 57.57140179981943;
  message = 'Hello World';
  bounds = [
    [56.71206514379577, -20.702642368289588], // Southwest coordinates
    [58.47918717931003, -19.6383333967767] // Northeast coordinates
  ];
  source: any;
  New: FormGroup;
  markers: any;
  dropdown: any = []
  marker1:any

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
  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      minZoom: 2,
      zoom: 9,
      center: [this.lng, this.lat],
      maxBounds: this.bounds


    })
    //add navigation control to map 
    this.map.addControl(new mapboxgl.NavigationControl());

   
    this.map.on('load', (event) => {
      this.data2.forEach(element => {
      console.log(element);
      this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
      this.marker1.setLngLat([element.Longitude, element.Latitude])
      .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
    .setHTML('<h3>Name: ' + element.fname +" "+ element.lname + '</h3><p> Addrress: ' + element.address + '</p>'))
        .addTo(this.map);

    })
  });

  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    setTimeout(() => {
      this.initializeMap()

    }, 4000);
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




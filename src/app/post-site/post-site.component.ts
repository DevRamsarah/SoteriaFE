import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { Dispatcher } from 'src/model/dispatcher/dispatcher.model';
import { Router } from '@angular/router';
import * as mapboxgl from "mapbox-gl";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-site',
  templateUrl: './post-site.component.html',
  styleUrls: ['./post-site.component.css']
})
export class PostSiteComponent implements OnInit {
  recStatus=true

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
  markers: any;
  dropdown: any = []
  marker1:any

  edit = false;
  editE = null;
  loading = true;
  active = false;
  data: any;
  data2: any;
  displayedColumns2: string[] = ['PostSite', 'ClientName', 'ClientMob', 'Email', 'action'];


  dataSource2 = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public firebaseCrud: PostSiteService, public router: Router) {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'

   }
  ngOnInit(): void {


    this.firebaseCrud.getPostSite().subscribe((Dispatches: any) => {
      this.data = Dispatches.filter((client) => client.recordStatus === 'archieve');
      this.data2 = Dispatches.filter((client) => client.recordStatus === 'active');

      this.loading = false;

      this.dataSource2 = new MatTableDataSource<Dispatcher>(this.data2);

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
      this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
      this.marker1.setLngLat([element.Longitude, element.Latitude])
      .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
    .setHTML('<h3>Name: ' + element.ClientName+" ("+ element.PsLocation+ ")" +" "+ element.ClientAddress + '</h3><p> Addrress: ' + element.address + '</p>'))
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
    this.router.navigate(["/PostSite/New-PostSite"]);
  }

  editData(id) {
    location.href = "PostSite/New-PostSite/?edit=" + id;
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
        this.firebaseCrud.deletePostSite(id).then(
          () => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )          }
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




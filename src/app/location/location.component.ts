
  import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { SelectionModel } from '@angular/cdk/collections';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { SchedulerService } from 'src/services/scheduler/scheduler.service';
  import { Dispatcher } from 'src/model/dispatcher/dispatcher.model';
  import { Router } from '@angular/router';
  import * as mapboxgl from "mapbox-gl";
  import { environment } from 'src/environments/environment';
  import Swal from 'sweetalert2';
  import {animate, state, style, transition, trigger} from '@angular/animations';
import { AngularFirestore } from '@angular/fire/firestore';
  @Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })
  export class LocationComponent implements OnInit {
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
    data: any=[];
    data2: any;
    displayedColumns2: string[] = ['PostSite', 'Guard'];
  
  
    dataSource2 = new MatTableDataSource();
    selection = new SelectionModel(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
    constructor(public firebaseCrud: SchedulerService, public fire: AngularFirestore, public router: Router) {
      mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'
  
     }
    ngOnInit(): void {
      this.fire.collection('postSite', ref => ref.where("ClientName", "==",  JSON.parse(localStorage.getItem('CurentUser'))[0].fname)).valueChanges()
      .subscribe((PostSite: any) => {
        console.log(PostSite);
this.data.push({
  Longitude:PostSite[0].Longitude,
  Latitude:PostSite[0].Latitude,
  ClientName:PostSite[0].ClientName,
  PsLocation:PostSite[0].PsLocation,
  ClientAddress: PostSite[0].ClientAddress
})
        // this.psCoordinate.Latitude = PostSite[0].Latitude
        // this.psCoordinate.Longitude = PostSite[0].Longitude
        // this.psCoordinate.Zone = PostSite[0].Zone
        // this.invoice.Summary = PostSite[0].ClientAddress;
      })

  
      this.fire.collection('Schedulers', ref => ref.where("ClientName", "==",  JSON.parse(localStorage.getItem('CurentUser'))[0].fname)).valueChanges()
      .subscribe((Dispatches: any) => {
        console.log(Dispatches);
        let arr=[]
        Dispatches.forEach(element => {
          arr.push(
            {...element,
              start: new Date(element.start).toISOString().split('T')[0],
              end: new Date(element.end).toISOString().split('T')[0]
            }
          )
        });
        this.data2 = arr;
  
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
        this.data.forEach(element => {
        console.log(element);
        this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#d02922" })
        this.marker1.setLngLat([element.Longitude, element.Latitude])
        .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
      .setHTML('<h3>Name: ' + element.ClientName+" ("+ element.PsLocation+ ")" +  '</h3><p> Addrress: ' + element.ClientAddress  + '</p>'))
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
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource2.filter = filterValue.trim().toLowerCase();
    }



  }
  
  
  
  
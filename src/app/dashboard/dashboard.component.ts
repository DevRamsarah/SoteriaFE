import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/services/client/client.service';
import { GuardService } from 'src/services/guard/guard.service';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { DispatcherService } from 'src/services/dispatcher/dispatcher.service';
import * as mapboxgl from "mapbox-gl";
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  marker1: any
  GuardC=[];
  ClientC=[];
  PostSiteC=[];

  CountClient = 0
  CountGuard = 0
  CountPostSite = 0
  CountInvoice = 0
  CountDispatch = 0
  constructor(
    public ClientD: ClientService,
    public GuardD: GuardService,
    public PostSiteD: PostSiteService,
    public InvoiceD: InvoiceService,
    public DispatchD: DispatcherService,
  ) {
    mapboxgl.accessToken ='pk.eyJ1IjoibGVkZXYyMiIsImEiOiJjazZkdjR2bTAxbTA1M2VwazJ3d3ZobWQzIn0.fFPWIyd4gaaSLiuwx_ROJA'

   }

  ngOnInit(): void {
    this.ClientD.getClient().subscribe((Client: any) => {
      Client.forEach(element => {
        this.ClientC.push(element)
        this.CountClient++;
      });
    });

    this.GuardD.getGuard().subscribe((Guard: any) => {
      Guard.forEach(element => {
        this.GuardC.push(element)

        this.CountGuard++;
      });
    });

    this.PostSiteD.getPostSite().subscribe((PostSite: any) => {
      PostSite.forEach(element => {
        this.PostSiteC.push(element)

        this.CountPostSite++;
      });
    });

    this.DispatchD.getDispatch().subscribe((Dispatch: any) => {
      Dispatch.forEach(element => {
        this.CountDispatch++;
      });
    });

    this.InvoiceD.getInvoice().subscribe((Invoice: any) => {
      Invoice.forEach(element => {
        this.CountInvoice++;
      });
    });

    setTimeout(() => {
      this.initializeMap()

    }, 4000);
  }


  initializeMap() {
    // console.log(this.GuardC);
    
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

      this.GuardC.forEach(element => {
        console.log(element);
        this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#053AFD" })
        this.marker1.setLngLat([element.Longitude, element.Latitude])
          .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
            .setHTML('<h3>Guard Name: ' + element.fname + " " + element.lname + '</h3><p> Addrress: ' + element.address + '</p>'))
          .addTo(this.map);
      })
      

      this.PostSiteC.forEach(element => {
        console.log(element);
        this.marker1 = new mapboxgl.Marker({ draggable: false, color: "#05FD1F" })
        this.marker1.setLngLat([element.Longitude, element.Latitude])
          .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
            .setHTML('<h3>PostSite: ' + element.ClientName + " (" + element.PsLocation + ")" + " " + '</h3><p> Addrress: ' +  element.ClientAddress + '</p>'))
          .addTo(this.map);

      })
    });



  }

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/services/client/client.service';
import { GuardService } from 'src/services/guard/guard.service';
import { PostSiteService } from 'src/services/post-site/post-site.service';
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { DispatcherService } from 'src/services/dispatcher/dispatcher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.ClientD.getClient().subscribe((Client: any) => {
      Client.forEach(element => {
        this.CountClient++;
      });
    });

    this.GuardD.getGuard().subscribe((Guard: any) => {
      Guard.forEach(element => {
        this.CountGuard++;
      });
    });

    this.PostSiteD.getPostSite().subscribe((PostSite: any) => {
      PostSite.forEach(element => {
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
  }

}

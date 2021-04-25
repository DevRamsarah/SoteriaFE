import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardComponent } from './guard/guard.component';
import { ClientComponent } from './client/client.component';
import { LocationComponent } from './location/location.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostSiteComponent } from './post-site/post-site.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { ReportComponent } from './report/report.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { PayrollComponent } from './payroll/payroll.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MessengerComponent } from './messenger/messenger.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { NewClientComponent } from './client/new-client/new-client/new-client.component';
import { NewGuardComponent } from './guard/new-guard/new-guard.component';
import { NewDispatcherComponent } from './dispatcher/new-dispatcher/new-dispatcher.component';
import { NewPostSiteComponent } from './post-site/new-post-site/new-post-site.component';
import { ZoneComponent } from './zone/zone.component';
import { ProfileComponent } from './profile/profile.component';
import { AddZoneComponent } from './zone/add-zone/add-zone.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AuthGuard } from '../services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'Dashboard', component: DashboardComponent,canActivate: [AuthGuard],

  },
  {
    path: 'Guards', component: GuardComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Clients', component: ClientComponent, canActivate: [AuthGuard],


  },
  {
    path: 'Profile', component: ProfileComponent,


  },
  {
    path: 'Clients/New-client', component: NewClientComponent, canActivate: [AuthGuard],


  },
  {
    path: 'Guards/New-guard', component: NewGuardComponent, canActivate: [AuthGuard],


  },
  {
    path: 'Dispatcher/New-dispatcher', component: NewDispatcherComponent, canActivate: [AuthGuard],


  },
  {
    path: 'PostSite/New-PostSite', component: NewPostSiteComponent, canActivate: [AuthGuard],


  },
  {
    path: 'Location', component: LocationComponent,

  },
  {
    path: 'Dispatcher', component: DispatcherComponent, canActivate: [AuthGuard],

  },

  {
    path: 'Admin', component: RegisterComponent,canActivate: [AuthGuard],

  },
  {
    path: 'Home', component: HomeComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Zone', component: ZoneComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Zone/New-Zone', component: AddZoneComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Visitors', component: VisitorsComponent, canActivate: [AuthGuard],

  },
  {
    path: 'PostSite', component: PostSiteComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Tracker', component: TrackerComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Messenger', component: MessengerComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Reports', component: ReportComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Scheduler', component: SchedulerComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Time', component: TimeClockComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Payroll', component: PayrollComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Invoicer', component: InvoiceComponent, canActivate: [AuthGuard],

  },
  {
    path: 'Invoicer/New-invoice', component: AddInvoiceComponent, canActivate: [AuthGuard],

  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

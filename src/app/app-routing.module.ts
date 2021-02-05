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


const routes: Routes = [
  {
    path: 'Dashboard', component: DashboardComponent,

  },
  {
    path: 'Guards', component: GuardComponent,

  },
  {
    path: 'Clients', component: ClientComponent,


  },
  {
    path: 'Clients/New-client', component: NewClientComponent,


  },
  {
    path: 'Guards/New-guard', component: NewGuardComponent,


  },
  {
    path: 'Dispatcher/New-dispatcher', component: NewDispatcherComponent,


  },
  {
    path: 'Location', component: LocationComponent,

  },
  {
    path: 'Dispatcher', component: DispatcherComponent,

  },
  {
    path: 'Login', component: LoginComponent,

  },
  {
    path: 'Register', component: RegisterComponent,

  },
  {
    path: 'Home', component: HomeComponent,

  },
  {
    path: 'Visitors', component: VisitorsComponent,

  },
  {
    path: 'PostSite', component: PostSiteComponent,

  },
  {
    path: 'Tracker', component: TrackerComponent,

  },
  {
    path: 'Messenger', component: MessengerComponent,

  },
  {
    path: 'Reports', component: ReportComponent,

  },
  {
    path: 'Scheduler', component: SchedulerComponent,

  },
  {
    path: 'Time', component: TimeClockComponent,

  },
  {
    path: 'Payroll', component: PayrollComponent,

  },
  {
    path: 'Invoicer', component: InvoiceComponent,

  },
  { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

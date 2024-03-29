import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from 'src/services/firebase.service';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { LocationComponent } from './location/location.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { DispatcherComponent } from './dispatcher/dispatcher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardComponent } from './guard/guard.component';
import { TrackerComponent } from './tracker/tracker.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ReportComponent } from './report/report.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { PayrollComponent } from './payroll/payroll.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CustomMaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './dashboard/card/card.component';
import { PostSiteComponent } from './post-site/post-site.component';
import { NewClientComponent } from './client/new-client/new-client/new-client.component';
import { NewGuardComponent } from './guard/new-guard/new-guard.component';
import { NewPostSiteComponent } from './post-site/new-post-site/new-post-site.component';
import { NewDispatcherComponent } from './dispatcher/new-dispatcher/new-dispatcher.component';
import { NewVisitorComponent } from './visitors/new-visitor/new-visitor.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZoneComponent } from './zone/zone.component';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AddZoneComponent } from './zone/add-zone/add-zone.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientComponent,
    LocationComponent,
    SidebarComponent,
    HeaderComponent,
    SpinnerComponent,
    DispatcherComponent,
    DashboardComponent,
    GuardComponent,
    TrackerComponent,
    VisitorsComponent,
    MessengerComponent,
    ReportComponent,
    SchedulerComponent,
    TimeClockComponent,
    PayrollComponent,
    InvoiceComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    PostSiteComponent,
    NewClientComponent,
    NewGuardComponent,
    NewPostSiteComponent,
    NewDispatcherComponent,
    NewVisitorComponent,
    ZoneComponent,
    AddZoneComponent,
    AddInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      // apiKey: "AIzaSyAuP1Fv3Hx0Qw1gT9wroxJmiPFke1ufF98",
      // authDomain: "demoauth-48ba3.firebaseapp.com",
      // databaseURL: "https://demoauth-48ba3.firebaseio.com",
      // projectId: "demoauth-48ba3",
      // storageBucket: "demoauth-48ba3.appspot.com",
      // messagingSenderId: "176754222221",
      // appId: "1:176754222221:web:797017e545d6794ff6eec4"
      apiKey: "AIzaSyB-xbEQIqiil60fHnTg0dGCLiFKPUCw8wk",
      authDomain: "soteria-a2ac4.firebaseapp.com",
      databaseURL: "https://soteria-a2ac4.firebaseio.com",
      projectId: "soteria-a2ac4",
      storageBucket: "soteria-a2ac4.appspot.com",
      messagingSenderId: "606448462013",
      appId: "1:606448462013:web:4d21eca7f53786000defd4"
    }),
    // AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    DateInputsModule,
    DropDownsModule,
    DialogsModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

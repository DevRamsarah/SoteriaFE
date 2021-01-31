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

const routes: Routes = [
  {
    path: 'Dashboard', component: DashboardComponent,

  },
  {
    path: 'Guards', component: GuardComponent,

  },
  {
    path: 'Clients', component: ClientComponent,

  }, {
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

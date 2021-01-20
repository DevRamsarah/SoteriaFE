import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardComponent } from './guard/guard.component';
import { ClientComponent } from './client/client.component';
import { LocationComponent } from './location/location.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';

const routes: Routes = [
  {
    path: 'Home', component: HomeComponent,

  },
  {
    path: 'Guards', component: GuardComponent,

  },
  {
    path: 'Client', component: ClientComponent,

  }, {
    path: 'Location', component: LocationComponent,

  },
  {
    path: 'Dispatcher', component: DispatcherComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

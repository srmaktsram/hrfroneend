import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { DemoClientsListComponent } from './demo-clients-list/clients-list.component';
import { VisitorClientsListComponent } from './visitor-clients-list/clients-list.component';
import { PremiumClientsListComponent } from './premium-clients-list/clients-list.component';
import { ClientsProfileComponent } from './clients-profile/clients-profile.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      
      {
        path: 'democlients',
        component: DemoClientsListComponent
      },
      {
        path: 'visitorclients',
        component: VisitorClientsListComponent
      },
      {
        path: 'premiumclients',
        component: PremiumClientsListComponent
      },
      {
        path: 'clientsprofile/:id',
        component: ClientsProfileComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

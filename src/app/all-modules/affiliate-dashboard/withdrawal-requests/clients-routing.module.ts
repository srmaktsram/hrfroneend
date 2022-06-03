import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
// import { DemoClientsListComponent } from './demo-clients-list/clients-list.component';
import { ReleaseHistoryComponent } from './release-history/clients-list.component';
// import { WithdrwalRequestComponent } from './withdrawal-request-list/clients-list.component';
import { ClientsProfileComponent } from './clients-profile/clients-profile.component';
import { WithdrwalRequestComponent } from './withdrawal-request-list/clients-list.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      
      // {
      //   path: 'democlients',
      //   component: DemoClientsListComponent
      // },
      {
        path: 'releasehistory',
        component: ReleaseHistoryComponent
      },
      {
        path: 'withdrawalrequest',
        component: WithdrwalRequestComponent
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

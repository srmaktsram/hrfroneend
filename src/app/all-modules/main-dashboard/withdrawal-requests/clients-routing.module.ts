import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { RejectedHistoryComponent } from './rejected-requests/clients-list.component';
import { ReleaseHistoryComponent } from './release-history/clients-list.component';
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
        path: 'rejected-requests',
        component: RejectedHistoryComponent
      },
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

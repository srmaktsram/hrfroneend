import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { VerifyKycListComponent } from './verify-list/clients-list.component';
import { PendingKycListComponent } from './pending-list/clients-list.component';
import { RejectKycListComponent } from './reject-list/clients-list.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'pendingkyc',
        component: PendingKycListComponent
      },
      
      {
        path: 'verifykyc',
        component: VerifyKycListComponent
      },
     
      {
        path: 'rejectkyc',
        component: RejectKycListComponent
      },
     

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './kyc.component';
import { VerifyKycListComponent } from './verify-kyc-list/verify-kyc-list.component';
import { PendingKycListComponent } from './pending-kyc-list/pending-kyc-list.component';
import { RejectKycListComponent } from './reject-kyc-list/reject-kyc-list.component';
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

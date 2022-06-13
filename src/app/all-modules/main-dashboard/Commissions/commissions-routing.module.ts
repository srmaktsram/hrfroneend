import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedCommissionListComponent } from './approved-commision-list/approved-commision-list.component';
import { CommissionListComponent } from './commission-list/commission-list.component';
import { ClientsComponent } from './commissions.component';
import { RejectCommissionListComponent } from './reject-commision-list/reject-commision-list.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'commission',
        component: CommissionListComponent
      },
     
      {
        path: 'reject-commission',
        component: RejectCommissionListComponent
      },
      {
        path: 'approved-commission',
        component: ApprovedCommissionListComponent
      },
     

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './leads.component';
import { VisitorClientsListComponent } from './leads-list/leads-list.component';
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
        path: 'myleads',
        component: VisitorClientsListComponent
      },
      // {
      //   path: 'premiumclients',
      //   component: PremiumClientsListComponent
      // },
      // {
      //   path: 'clientsprofile/:id',
      //   component: ClientsProfileComponent
      // },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

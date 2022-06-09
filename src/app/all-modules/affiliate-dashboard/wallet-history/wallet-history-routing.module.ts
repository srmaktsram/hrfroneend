import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './wallet-history.component';
import { ClientsListComponent } from './wallet-history-list/wallet-history-list.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      
      {
        path: 'wallet-historylist',
        component: ClientsListComponent
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

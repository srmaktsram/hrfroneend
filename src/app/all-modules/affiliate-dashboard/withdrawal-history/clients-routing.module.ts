import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      
      {
        path: 'withdrawalhistorylist',
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

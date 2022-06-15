import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyKycComponent } from './kyc.component';
import { KycListComponent } from './my-kyc/kyc-list.component';
const routes: Routes = [
  {
    path: '',
    component: MyKycComponent,
    children: [
      
      
      {
        path: 'my-kyc',
        component: KycListComponent
      },
      


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycRoutingModule { }

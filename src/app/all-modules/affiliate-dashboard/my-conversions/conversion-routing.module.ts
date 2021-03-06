import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateComponent } from './conversion.component';
import { VisitorAffiliateListComponent } from './my-conversion-list/conversions-list.component';
const routes: Routes = [
  {
    path: '',
    component: AffiliateComponent,
    children: [
      
      // {
      //   path: 'demoaffiliate',
      //   component: DemoAffiliateListComponent
      // },
      {
        path: 'myconversion',
        component: VisitorAffiliateListComponent
      },
      // {
      //   path: 'premiumaffiliate',
      //   component: PremiumAffiliateListComponent
      // },
      // {
      //   path: 'affiliateprofile/:id',
      //   component: AffiliateProfileComponent
      // },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliateRoutingModule { }

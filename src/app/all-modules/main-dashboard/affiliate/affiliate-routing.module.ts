import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AffiliateComponent } from "./affiliate.component";
import { FreeAffiliateListComponent } from "./free-affiliate-list/free-affiliate-list.component";
import { VisitorAffiliateListComponent } from "./visitor-affiliate-list/visitor-affiliate-list.component";
import { PremiumAffiliateListComponent } from "./premium-affiliate-list/premium-affiliate-list.component";
import { AffiliateProfileComponent } from "./affiliate-profile/affiliate-profile.component";
const routes: Routes = [
  {
    path: "",
    component: AffiliateComponent,
    children: [
      {
        path: "demoaffiliate",
        component: FreeAffiliateListComponent,
      },
      {
        path: "visitoraffiliate",
        component: VisitorAffiliateListComponent,
      },
      {
        path: "premiumaffiliate",
        component: PremiumAffiliateListComponent,
      },
      {
        path: "affiliateprofile/:id",
        component: AffiliateProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliateRoutingModule {}

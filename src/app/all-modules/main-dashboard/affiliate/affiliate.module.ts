import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AffiliateRoutingModule } from "./affiliate-routing.module";
import { DataTablesModule } from "angular-datatables";



import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AffiliateComponent } from "./affiliate.component";
import { AffiliateProfileComponent } from "./affiliate-profile/affiliate-profile.component";
import { VisitorAffiliateListComponent } from "./visitor-affiliate-list/visitor-affiliate-list.component";
import { DemoAffiliateListComponent } from "./free-affiliate-list/free-affiliate-list.component";
import { PremiumAffiliateListComponent } from "./premium-affiliate-list/premium-affiliate-list.component";

@NgModule({
  declarations: [
    AffiliateComponent,
    AffiliateProfileComponent,
    VisitorAffiliateListComponent,
    DemoAffiliateListComponent,
    PremiumAffiliateListComponent
  ],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AffiliateModule {}

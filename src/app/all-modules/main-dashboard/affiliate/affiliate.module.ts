import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AffiliateRoutingModule } from "./affiliate-routing.module";
import { DataTablesModule } from "angular-datatables";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AffiliateComponent } from "./affiliate.component";
import { AffiliateProfileComponent } from "./affiliate-profile/affiliate-profile.component";
import { VisitorAffiliateListComponent } from "./rejected-affiliate-list/rejected-affiliate-list.component";
import { FreeAffiliateListComponent } from "./pending-affiliate-list/pending-affiliate-list.component";
import { PremiumAffiliateListComponent } from "./approved-affiliate-list/approved-affiliate-list.component";

@NgModule({
  declarations: [
    AffiliateComponent,
    AffiliateProfileComponent,
    VisitorAffiliateListComponent,
    FreeAffiliateListComponent,
    PremiumAffiliateListComponent,
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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AffiliateRoutingModule } from "./conversion-routing.module";
import { DataTablesModule } from "angular-datatables";



import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AffiliateComponent } from "./conversion.component";
import { VisitorAffiliateListComponent } from "./my-conversion-list/conversions-list.component";

@NgModule({
  declarations: [
    AffiliateComponent,
    VisitorAffiliateListComponent,
  ],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MyConversionsModule {}

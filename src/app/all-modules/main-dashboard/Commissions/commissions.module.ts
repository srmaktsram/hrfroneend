import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./commissions-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./commissions.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RejectCommissionListComponent } from "./reject-commision-list/reject-commision-list.component";
import { ApprovedCommissionListComponent } from "./approved-commision-list/approved-commision-list.component";
import { CommissionListComponent } from "./commission-list/commission-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    CommissionListComponent,
    RejectCommissionListComponent,
    ApprovedCommissionListComponent    
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommissionModule {}

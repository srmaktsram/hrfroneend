import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./kyc-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./kyc.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RejectKycListComponent } from "./reject-kyc-list/reject-kyc-list.component";
import { VerifyKycListComponent } from "./verify-kyc-list/verify-kyc-list.component";
import { PendingKycListComponent } from "./pending-kyc-list/pending-kyc-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    RejectKycListComponent,
    VerifyKycListComponent,
    PendingKycListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class KycModule {}

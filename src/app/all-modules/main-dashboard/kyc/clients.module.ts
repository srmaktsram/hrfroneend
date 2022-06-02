import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RejectKycListComponent } from "./reject-list/clients-list.component";
import { VerifyKycListComponent } from "./verify-list/clients-list.component";
import { PendingKycListComponent } from "./pending-list/clients-list.component";

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

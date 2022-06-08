import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReleaseHistoryComponent } from "./release-history/clients-list.component";
import { WithdrwalRequestComponent } from "./withdrawal-request-list/clients-list.component";
import { RejectedHistoryComponent } from "./rejected-requests/clients-list.component";
import { SharingModule } from "src/app/sharing/sharing.module";

@NgModule({
  declarations: [
    ClientsComponent,
    ReleaseHistoryComponent,
    RejectedHistoryComponent,
    WithdrwalRequestComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SharingModule
  ],
})
export class WithdrawalRequestModule {}

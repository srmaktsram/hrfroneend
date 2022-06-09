import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./withdrawal-request-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./withdrawal-request.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReleaseHistoryComponent } from "./release-history/release-request-list.component";
import { WithdrwalRequestComponent } from "./withdrawal-request-list/pending-request-list.component";
import { RejectedHistoryComponent } from "./rejected-requests/rejected-request-list.component";
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

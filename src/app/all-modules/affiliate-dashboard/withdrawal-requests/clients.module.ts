import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { ClientsProfileComponent } from "./clients-profile/clients-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReleaseHistoryComponent } from "./release-history/clients-list.component";
// import { DemoClientsListComponent } from "./demo-clients-list/clients-list.component";
import { WithdrwalRequestComponent } from "./withdrawal-request-list/clients-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsProfileComponent,
    ReleaseHistoryComponent,
    // DemoClientsListComponent,
    WithdrwalRequestComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WithdrawalRequestModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./wallet-history-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./wallet-history.component";
import { ClientsListComponent } from "./wallet-history-list/wallet-history-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
      ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class walletHistoryModule {}

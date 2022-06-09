import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./withdrawal-history-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./withdrawal-history.component";
import { ClientsListComponent } from "./withdrawal-history-list/withdrawal-history-list.component";
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
export class withdrawalHistoryModule {}

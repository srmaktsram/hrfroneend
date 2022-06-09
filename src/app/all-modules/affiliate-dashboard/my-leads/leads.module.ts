import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./leads-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./leads.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisitorClientsListComponent } from "./leads-list/leads-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    VisitorClientsListComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MyLeadsModule {}

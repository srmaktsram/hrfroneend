import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisitorClientsListComponent } from "./visitor-clients-list/clients-list.component";

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

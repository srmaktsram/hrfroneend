import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./sub-admin-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./sub-admin.component";
import { ClientsListComponent } from "./sub-admin-list/sub-admin-list.component";
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
export class SubAdminModule {}

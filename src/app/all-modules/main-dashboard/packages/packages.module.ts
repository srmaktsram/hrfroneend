import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./packages-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./packages.component";
import { ClientsListComponent } from "./packages-list/packages-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [ClientsComponent, ClientsListComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class PackagesModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./promocodes-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./promocodes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ClientsListComponent } from "./promocodes-list/promocodes-list.component";

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
export class PromocodesModule {}

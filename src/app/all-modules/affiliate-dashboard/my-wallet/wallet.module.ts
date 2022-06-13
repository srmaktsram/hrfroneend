import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./wallet-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./wallet.component";
import { ClientsListComponent } from "./wallet-list/wallet-list.component";
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
export class MyWalletModule {}

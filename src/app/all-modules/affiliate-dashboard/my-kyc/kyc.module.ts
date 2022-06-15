import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyKycComponent } from "./kyc.component";
import { KycListComponent } from "./my-kyc/kyc-list.component";
import { KycRoutingModule } from "./kyc-routing.module";

@NgModule({
  declarations: [
    MyKycComponent,
    KycListComponent,
  ],
  imports: [
    CommonModule,
    KycRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MyKycModule {}

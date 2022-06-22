import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTablesModule } from 'angular-datatables';
import { SharingModule } from "src/app/sharing/sharing.module";
import { PricingComponent } from "./pricing.component";

export const routes = [
  { path: "", component: PricingComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharingModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [PricingComponent],
})
export class PricingModule { }

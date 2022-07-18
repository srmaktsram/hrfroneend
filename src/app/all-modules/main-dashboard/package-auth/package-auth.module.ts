import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PackageAuthRoutingModule } from "./package-auth-routing.module";
import { PackageAuthListComponent } from "./package-auth-list/package-auth-list.component";
import { PackageAuthComponent } from "./package-auth.component";

@NgModule({
  declarations: [PackageAuthComponent, PackageAuthListComponent],
  imports: [
    CommonModule,
    PackageAuthRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PackageAuthModule {}

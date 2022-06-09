import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { DashboardRoutingModule } from "./main-dashboard-routing.module";
import { DashboardComponent } from "./main-dashboard.component";
import { AdminDashboardComponent } from "./main-admin-dashboard/main-admin-dashboard.component";
import { MorrisJsModule } from "angular-morris-js";

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    DataTablesModule,
  ],
})
export class MainDashboardModule {}

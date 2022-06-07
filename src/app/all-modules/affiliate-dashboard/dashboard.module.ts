import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { AffiliateAdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { MorrisJsModule } from "angular-morris-js";

@NgModule({
  declarations: [DashboardComponent, AffiliateAdminDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    DataTablesModule,
  ],
})
export class AffiliateModule {}

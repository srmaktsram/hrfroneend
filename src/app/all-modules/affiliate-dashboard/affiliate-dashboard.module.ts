import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { DashboardRoutingModule } from "./affiliate-dashboard.routing.module";
import { DashboardComponent } from "./affiliate-dashboard.component";
import { AffiliateAdminDashboardComponent } from "./affiliates-dashboard/affiliates-dashboard.component";
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

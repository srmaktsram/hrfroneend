import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { DashboardRoutingModule } from "./affiliate-dashboard.routing.module";
import { DashboardComponent } from "./affiliate-dashboard.component";
import { AffiliateAdminDashboardComponent } from "./affiliates-dashboard/affiliates-dashboard.component";
import { MorrisJsModule } from "angular-morris-js";
import { SrmakPannelComponent } from "./srmak-pannel/srmak-pannel.component";

@NgModule({
  declarations: [DashboardComponent, AffiliateAdminDashboardComponent, SrmakPannelComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    DataTablesModule,
  ],
})
export class AffiliateModule { }

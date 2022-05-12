import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";
import { MorrisJsModule } from "angular-morris-js";
import { LeavesEmployeeComponent } from "../employees/leaves-employee/leaves-employee.component";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    LeavesEmployeeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    DataTablesModule,
  ],
})
export class DashboardModule {}

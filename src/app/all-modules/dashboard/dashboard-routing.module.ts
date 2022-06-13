import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";
import { AuthGuardAdmin } from "src/app/core/auth/auth-guard-admin.service";
import { AuthGuardEmployee } from "src/app/core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "employee",
        component: EmployeeDashboardComponent,
        canActivate: [AuthGuardEmployee],
      },
      {
        path: "admin",
        component: AdminDashboardComponent,
        canActivate: [AuthGuardAdmin],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

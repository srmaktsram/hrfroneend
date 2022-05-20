import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "admindashboard", component: AdminDashboardComponent },

      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientAdminModule),
      },
      {
        path: "tickets",
        loadChildren: () =>
          import("./tickets/tickets.module").then((m) => m.TicketsModule),
      },
      {
        path: "accounts",
        loadChildren: () =>
          import("./accounts/accounts.module").then((m) => m.AccountsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

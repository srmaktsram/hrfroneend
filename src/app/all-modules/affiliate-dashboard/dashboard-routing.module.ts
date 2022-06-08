import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AffiliateAdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { DashboardComponent } from "./dashboard.component";
// import { AdminDashboardComponent } from "./affiliate-admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "affiliatedashboard",
        component: AffiliateAdminDashboardComponent,
      },

      {
        path: "myleads",
        loadChildren: () =>
          import("./my-leads/clients.module").then((m) => m.MyLeadsModule),
      },
      {
        path: "myconversion",
        loadChildren: () =>
          import("./my-conversions/affiliate.module").then(
            (m) => m.MyConversionsModule
          ),
      },
      {
        path: "my-wallet",
        loadChildren: () =>
          import("./my-wallet/clients.module").then((m) => m.MyWalletModule),
      },
      {
        path: "withdrawalhistory",
        loadChildren: () =>
          import("./withdrawal-history/clients.module").then(
            (m) => m.withdrawalHistoryModule
          ),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then(
            (m) => m.AffiliateSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

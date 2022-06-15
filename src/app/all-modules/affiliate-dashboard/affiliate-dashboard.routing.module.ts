import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AffiliateAdminDashboardComponent } from "./affiliates-dashboard/affiliates-dashboard.component";
import { DashboardComponent } from "./affiliate-dashboard.component";
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
          import("./my-leads/leads.module").then((m) => m.MyLeadsModule),
      },
      {
        path: "my-kyc",
        loadChildren: () =>
          import("./my-kyc/kyc.module").then((m) => m.MyKycModule),
      },
      {
        path: "myleads",
        loadChildren: () =>
          import("./my-leads/leads.module").then((m) => m.MyLeadsModule),
      },
      {
        path: "myconversion",
        loadChildren: () =>
          import("./my-conversions/conversion.module").then(
            (m) => m.MyConversionsModule
          ),
      },
      {
        path: "my-wallet",
        loadChildren: () =>
          import("./my-wallet/wallet.module").then((m) => m.MyWalletModule),
      },
      {
        path: "withdrawalhistory",
        loadChildren: () =>
          import("./withdrawal-history/withdrawal-history.module").then(
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

      {
        path: "wallet-history",
        loadChildren: () =>
          import("./wallet-history/wallet-history.module").then((m) => m.walletHistoryModule),
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

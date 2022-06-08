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
      { path: "affiliatedashboard", component: AffiliateAdminDashboardComponent },

      {
        path: "myleads",
        loadChildren: () =>
          import("./my-leads/clients.module").then((m) => m.MyLeadsModule),
      },
      {
        path: "myconversion",
        loadChildren: () =>
          import("./my-conversions/affiliate.module").then((m) => m.MyConversionsModule),
      },
      {
        path: "my-wallet",
        loadChildren: () =>
          import("./my-wallet/clients.module").then((m) => m.MyWalletModule),
      },
      {
        path: "withdrawalhistory",
        loadChildren: () =>
          import("./withdrawal-history/clients.module").then((m) => m.withdrawalHistoryModule),
      },
      // {
      //   path: "tickets",
      //   loadChildren: () =>
      //     import("./clicks/tickets.module").then((m) => m.ClicksModule),
      // },
      // {
      //   path: "withdrawalrequests",
      //   loadChildren: () =>
      //     import("./withdrawal-requests/clients.module").then(
      //       (m) => m.WithdrawalRequestModule
      //     ),
      // },
      // {
      //   path: "releasehistory",
      //   loadChildren: () =>
      //     import("./withdrawal-requests/clients.module").then(
      //       (m) => m.WithdrawalRequestModule
      //     ),
      // },
      // {
      //   path: "pendingkyc",
      //   loadChildren: () =>
      //     import("./kyc/clients.module").then((m) => m.KycModule),
      // },
      // {
      //   path: "verifykyc",
      //   loadChildren: () =>
      //     import("./kyc/clients.module").then((m) => m.KycModule),
      // },
      // {
      //   path: "rejectkyc",
      //   loadChildren: () =>
      //     import("./kyc/clients.module").then((m) => m.KycModule),
      // },
      // {
      //   path: "accounts",
      //   loadChildren: () =>
      //     import("./accounts/accounts.module").then((m) => m.AccountsModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

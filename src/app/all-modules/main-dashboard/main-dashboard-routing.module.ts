import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./main-dashboard.component";
import { AdminDashboardComponent } from "./main-admin-dashboard/main-admin-dashboard.component";
import { SrmakPannelComponent } from "./srmak-pannel/srmak-pannel.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: SrmakPannelComponent,
      },
      {
        path: "admindashboard",
        component: AdminDashboardComponent,
      },

      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientAdminModule),
      },
      {
        path: "affiliates",
        loadChildren: () =>
          import("./affiliate/affiliate.module").then((m) => m.AffiliateModule),
      },
      {
        path: "promocodes",
        loadChildren: () =>
          import("./packages/promocodes.module").then(
            (m) => m.PromocodesModule
          ),
      },
      {
        path: "packages",
        loadChildren: () =>
          import("./package-auth/package-auth.module").then(
            (m) => m.PackageAuthModule
          ),
      },
      {
        path: "subadmins",
        loadChildren: () =>
          import("./sub-admin/sub-admin.module").then((m) => m.SubAdminModule),
      },
      {
        path: "tickets",
        loadChildren: () =>
          import("./tickets/tickets.module").then((m) => m.TicketsModule),
      },
      {
        path: "withdrawalrequests",
        loadChildren: () =>
          import("./withdrawal-requests/withdrawal-request.module").then(
            (m) => m.WithdrawalRequestModule
          ),
      },
      {
        path: "releasehistory",
        loadChildren: () =>
          import("./withdrawal-requests/withdrawal-request.module").then(
            (m) => m.WithdrawalRequestModule
          ),
      },
      {
        path: "rejected-requests",
        loadChildren: () =>
          import("./withdrawal-requests/withdrawal-request.module").then(
            (m) => m.WithdrawalRequestModule
          ),
      },
      {
        path: "pendingkyc",
        loadChildren: () => import("./kyc/kyc.module").then((m) => m.KycModule),
      },
      {
        path: "verifykyc",
        loadChildren: () => import("./kyc/kyc.module").then((m) => m.KycModule),
      },
      {
        path: "rejectkyc",
        loadChildren: () => import("./kyc/kyc.module").then((m) => m.KycModule),
      },
      {
        path: "commission",
        loadChildren: () =>
          import("./Commissions/commissions.module").then(
            (m) => m.CommissionModule
          ),
      },
      {
        path: "reject-commission",
        loadChildren: () =>
          import("./Commissions/commissions.module").then(
            (m) => m.CommissionModule
          ),
      },
      {
        path: "approved-commission",
        loadChildren: () =>
          import("./Commissions/commissions.module").then(
            (m) => m.CommissionModule
          ),
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

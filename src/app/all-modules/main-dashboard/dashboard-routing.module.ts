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
        path:"affiliates",
        loadChildren:()=>
        import("./affiliate/affiliate.module").then((m)=>m.AffiliateModule)
      },
      {
        path: "packages",
        loadChildren: () =>
          import("./packages/clients.module").then((m) => m.PackagesModule),
      },
      {
        path: "subadmins",
        loadChildren: () =>
          import("./sub-admin/clients.module").then((m) => m.SubAdminModule),
      },
      {
        path: "tickets",
        loadChildren: () =>
          import("./tickets/tickets.module").then((m) => m.TicketsModule),
      },
      {
        path: "withdrawalrequests",
        loadChildren: () =>
          import("./withdrawal-requests/clients.module").then((m) => m.WithdrawalRequestModule),
      },
      {
        path: "releasehistory",
        loadChildren: () =>
          import("./withdrawal-requests/clients.module").then((m) => m.WithdrawalRequestModule),
      },
      {
        path: "rejected-requests",
        loadChildren: () =>
          import("./withdrawal-requests/clients.module").then((m) => m.WithdrawalRequestModule),
      },
      {
        path: "pendingkyc",
        loadChildren: () =>
          import("./kyc/clients.module").then((m) => m.KycModule),
      },
      {
        path: "verifykyc",
        loadChildren: () =>
          import("./kyc/clients.module").then((m) => m.KycModule),
      },
      {
        path: "rejectkyc",
        loadChildren: () =>
          import("./kyc/clients.module").then((m) => m.KycModule),
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

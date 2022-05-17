import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardAdmin } from "./core/auth/auth-guard-admin.service";
import { AuthGuard } from "./core/auth/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "homepage", pathMatch: "full" },
  {
    path: "homepage",
    loadChildren: () =>
      import("./homepage/homepage.module").then((m) => m.HomePageModule),
  },
  {
    path: "error",
    loadChildren: () =>
      import("./errorpages/errorpages.module").then((m) => m.ErrorpagesModule),
  },
  {
    path: "layout",
    loadChildren: () =>
      import("./all-modules/all-modules.module").then(
        (m) => m.AllModulesModule
      ),
    // canActivate: [AuthGuardAdmin],
  },
  {
    path: "layout",
    loadChildren: () =>
      import("./all-modules/all-modules.module").then(
        (m) => m.AllModulesModule
      ),
    // canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/error/error404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

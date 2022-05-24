import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardAdmin } from "./core/auth/auth-guard-admin.service";
import { AuthGuard } from "./core/auth/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "pages", pathMatch: "full" },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  // {
  //   path: "pages",
  //   loadChildren: () =>
  //     import("./pages/pages.module").then((m) => m.PagesModule),
  // },
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

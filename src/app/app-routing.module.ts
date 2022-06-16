import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "affiliates",
        loadChildren: () =>
          import("./pages/affiliate/affiliate.module").then(
            (m) => m.AffilateModule
          ),
      },
      {
        path: "pricings",
        loadChildren: () =>
          import("./pages/pricing/pricing.module").then((m) => m.PricingModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./pages/products/products.module").then(
            (m) => m.ProductModule
          ),
      },
      {
        path: "profiles",
        loadChildren: () =>
          import("./pages/profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./pages/login/login.module").then((m) => m.LoginModule),
      },
    ],
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
  },

  { path: "**", redirectTo: "/error/error404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

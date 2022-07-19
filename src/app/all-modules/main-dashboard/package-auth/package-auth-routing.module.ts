import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PackageAuthListComponent } from "./package-auth-list/package-auth-list.component";
import { PackageAuthComponent } from "./package-auth.component";
const routes: Routes = [
  {
    path: "",
    component: PackageAuthComponent,
    children: [
      {
        path: "packageauthlist",
        component: PackageAuthListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageAuthRoutingModule {}

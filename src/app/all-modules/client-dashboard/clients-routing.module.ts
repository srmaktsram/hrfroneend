import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./clients.component";
// import { ClientsContentPageComponent } from "./clients-content-page/clients-content-page.component";
// import { ClientsListComponent } from "./clients-list/clients-list.component";
import { ClientsProfileComponent } from "./clients-profile/clients-profile.component";
import { ClientDashboardComponent } from "./client-dashboard/client-dashboard.component";
import { SrmakPannelComponent } from "./srmak-pannel/srmak-pannel.component";
const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: [
      {
        path: "",
        component: SrmakPannelComponent,
      },
      {
        path: "client-dashboard",
        component: ClientDashboardComponent,
      },
      {
        path: "clientsprofile",
        component: ClientsProfileComponent,
      },
      {
        path: "setting",
        loadChildren: () =>
          import("./settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }

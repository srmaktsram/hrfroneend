import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./clients.component";
import { DemoClientsListComponent } from "./free-clients-list/free-clients-list.component";
import { VisitorClientsListComponent } from "./visitor-clients-list/visitor-clients-list.component";
import { PremiumClientsListComponent } from "./premium-clients-list/premium-clients-list.component";
import { ClientsProfileComponent } from "./clients-profile/clients-profile.component";
import { BlockedClientsListComponent } from "./blocked-clients-list/blocked-clients-list.component";
const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: [
      {
        path: "freeClients",
        component: DemoClientsListComponent,
      },
      {
        path: "visitorclients",
        component: VisitorClientsListComponent,
      },
      {
        path: "premiumclients",
        component: PremiumClientsListComponent,
      },
      {
        path: "blockedclients",
        component: BlockedClientsListComponent,
      },
      {
        path: "clientsprofile/:id",
        component: ClientsProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}

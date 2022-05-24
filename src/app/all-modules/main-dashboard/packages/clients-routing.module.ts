import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./clients.component";
import { ClientsContentPageComponent } from "./clients-content-page/clients-content-page.component";
import { ClientsListComponent } from "./clients-list/clients-list.component";
const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: [
      {
        path: "packagesgrid",
        component: ClientsContentPageComponent,
      },
      {
        path: "packageslist",
        component: ClientsListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}

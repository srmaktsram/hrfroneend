import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./promocodes.component";
import { ClientsListComponent } from "./promocodes-list/promocodes-list.component";
const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: [
      {
        path: "promocodeslist",
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

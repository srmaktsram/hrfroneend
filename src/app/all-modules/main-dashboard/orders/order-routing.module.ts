import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./order.component";
import { ClientsListComponent } from "./order-list/order-list.component";
const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: [
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

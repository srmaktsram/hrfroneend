import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { ClientsContentPageComponent } from "./clients-content-page/clients-content-page.component";
import { ClientsProfileComponent } from "./clients-profile/clients-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisitorClientsListComponent } from "./visitor-clients-list/clients-list.component";
import { DemoClientsListComponent } from "./demo-clients-list/clients-list.component";
import { PremiumClientsListComponent } from "./premium-clients-list/clients-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsContentPageComponent,
    ClientsProfileComponent,
    VisitorClientsListComponent,
    DemoClientsListComponent,
    PremiumClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientAdminModule {}

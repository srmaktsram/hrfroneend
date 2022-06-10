import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRoutingModule } from "./clients-routing.module";
import { DataTablesModule } from "angular-datatables";

import { ClientsComponent } from "./clients.component";
import { ClientsProfileComponent } from "./clients-profile/clients-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisitorClientsListComponent } from "./visitor-clients-list/visitor-clients-list.component";
import { DemoClientsListComponent } from "./free-clients-list/free-clients-list.component";
import { PremiumClientsListComponent } from "./premium-clients-list/premium-clients-list.component";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsProfileComponent,
    VisitorClientsListComponent,
    DemoClientsListComponent,
    PremiumClientsListComponent,
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

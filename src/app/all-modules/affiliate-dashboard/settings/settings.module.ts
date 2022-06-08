import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SharingModule } from "src/app/sharing/sharing.module";
import { SettingsComponent } from "./settings.component";
import { BankSettingsComponent } from "./bank-setting/bank-settings.component";
import { ProfileSettingsComponent } from "./profile-setting/profile-settings.component";

@NgModule({
  declarations: [
    SettingsComponent,
    BankSettingsComponent,
    ProfileSettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DataTablesModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
  ],
})
export class AffiliateSettingsModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharingModule } from "src/app/sharing/sharing.module";
import { ProfileSettingsComponent } from "./profile-setting/profile-settings.component";

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    ProfileSettingsComponent
    
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
export class SettingsModule {}

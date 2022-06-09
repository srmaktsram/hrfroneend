import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { BankSettingsComponent } from "./bank-setting/bank-settings.component";
import { ProfileSettingsComponent } from "./profile-setting/profile-settings.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "bank-setting",
        component: BankSettingsComponent,
      },
      {
        path: "profile-setting",
        component: ProfileSettingsComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

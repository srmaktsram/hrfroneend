import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileSettingsComponent } from './profile-setting/profile-settings.component';

const routes: Routes = [
  {
    path:"",
    component:SettingsComponent,
    children:[
      {
        path:"change-password",
        component:ChangePasswordComponent
      },
      {
        path:"profile-settings",
        component:ProfileSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

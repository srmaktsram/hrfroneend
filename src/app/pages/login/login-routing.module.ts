import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { OtpComponent } from "./otp/otp.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { UserLoginComponent } from "./userlogin/userlogin.component";
import { AdminLoginComponent } from "./adminlogin/login.component";
import { ClientLoginComponent } from "./clientlogin/login.component";
import { AffiliateLoginComponent } from "./affilatelogin/login.component";
import { SubAdminLoginComponent } from "./subadmin/login.component";
import { RoleSubAdminComponent } from "./rolesubadmin/login.component";
import { RoleManagerComponent } from "./rolemanager/login.component";
import { RoleFinanceComponent } from "./rolefinance/login.component";
import { RoleAdminComponent } from "./roleadmin/login.component";
import { RoleHrComponent } from "./rolehr/login.component";
import { RoleReceptionistComponent } from "./rolereceptionist/login.component";

const routes: Routes = [
  { path: "", redirectTo: "roleadmin", pathMatch: "full" },
  { path: "employeelogin", component: UserLoginComponent },
  { path: "clientlogin", component: ClientLoginComponent },
  { path: "affiliatelogin", component: AffiliateLoginComponent },
  { path: "mainadminlogin", component: AdminLoginComponent },
  { path: "subadminlogin", component: SubAdminLoginComponent },
  { path: "adminlogin", component: LoginComponent },
  { path: "rolesubadmin", component: RoleSubAdminComponent },
  { path: "rolemanager", component: RoleManagerComponent },
  { path: "rolefinance", component: RoleFinanceComponent },
  { path: "roleadmin", component: RoleAdminComponent },
  { path: "rolereceptionist", component: RoleReceptionistComponent },
  { path: "rolehr", component: RoleHrComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "otp", component: OtpComponent },
  { path: "lockscreen", component: LockscreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

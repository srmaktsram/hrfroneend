import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { ForgotComponent } from "./forgot/forgot.component";
import { OtpComponent } from "./otp/otp.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { ReactiveFormsModule } from "@angular/forms";
// import { MatCardModule } from "@angular/material/card";
import { SharingModule } from "../../sharing/sharing.module";
import { UserLoginComponent } from "./userlogin/userlogin.component";
import { AdminLoginComponent } from "./adminlogin/login.component";
import { AffiliateLoginComponent } from "./affilatelogin/login.component";
import { ClientLoginComponent } from "./clientlogin/login.component";
import { SubAdminLoginComponent } from "./subadmin/login.component";
import { RoleAdminComponent } from "./roleadmin/login.component";
import { RoleFinanceComponent } from "./rolefinance/login.component";
import { RoleHrComponent } from "./rolehr/login.component";
import { RoleManagerComponent } from "./rolemanager/login.component";
import { RoleSubAdminComponent } from "./rolesubadmin/login.component";
import { RoleReceptionistComponent } from "./rolereceptionist/login.component";
export const routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "forgot", component: ForgotComponent, pathMatch: "" },
];
@NgModule({
  declarations: [
    LoginComponent,
    RoleReceptionistComponent,
    ClientLoginComponent,
    AffiliateLoginComponent,
    SubAdminLoginComponent,
    AdminLoginComponent,
    UserLoginComponent,
    ForgotComponent,
    OtpComponent,
    LockscreenComponent,
    RoleAdminComponent,
    RoleFinanceComponent,
    RoleHrComponent,
    RoleManagerComponent,
    RoleSubAdminComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharingModule,
  ],
})
export class LoginModule {}

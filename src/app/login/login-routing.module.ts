import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { RegisterComponent } from "./register/register.component";
import { OtpComponent } from "./otp/otp.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { UserLoginComponent } from "./userlogin/userlogin.component";
import { AdminLoginComponent } from "./adminlogin/login.component";
import { ClientLoginComponent } from "./clientlogin/login.component";
import { AffilateLoginComponent } from "./affilatelogin/login.component";

const routes: Routes = [
  { path: "", redirectTo: "adminlogin", pathMatch: "full" },
  { path: "userlogin", component: UserLoginComponent },
  { path: "clientlogin", component: ClientLoginComponent },
  { path: "affilatelogin", component: AffilateLoginComponent },
  { path: "adminhrlogin", component: AdminLoginComponent },
  { path: "adminlogin", component: LoginComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "register", component: RegisterComponent },
  { path: "otp", component: OtpComponent },
  { path: "lockscreen", component: LockscreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

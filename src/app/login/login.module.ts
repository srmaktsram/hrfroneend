import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { ForgotComponent } from "./forgot/forgot.component";
import { RegisterComponent } from "./register/register.component";
import { OtpComponent } from "./otp/otp.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { ReactiveFormsModule } from "@angular/forms";
// import { MatCardModule } from "@angular/material/card";
import { SharingModule } from "../sharing/sharing.module";
import { UserLoginComponent } from "./userlogin/userlogin.component";
// export const routes = [
//   { path: "", component: LoginComponent, pathMatch: "full" },
//   { path: "forgot", component: ForgotComponent, pathMatch: "" },
// ];
@NgModule({
  declarations: [
    LoginComponent,
    UserLoginComponent,
    ForgotComponent,
    SharingModule,
    RegisterComponent,
    OtpComponent,
    LockscreenComponent,
  ],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
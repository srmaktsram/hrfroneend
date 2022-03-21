import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  login(companyEmail: string, companyUsername: string, companyId: string) {
    sessionStorage.setItem("currentUser", "loggedin");
    sessionStorage.setItem("user_type", "employee");
    sessionStorage.setItem("companyEmail", companyEmail);
    sessionStorage.setItem("companyUsername", companyUsername);
    sessionStorage.setItem("companyId", companyId);

    return true;
  }
  loginreg(
    register_user_id: string,
    registered_user_name: string,
    loginfullname: string,
    loginEmail: string,
    loginMobile: string,
    profile_photo: string,
    kyc_current_status: string,
    password: string,
    user_type: string
  ) {
    sessionStorage.setItem("currentUser", "loggedin");
    sessionStorage.setItem("login_user_id", register_user_id);
    sessionStorage.setItem("login_user_name", registered_user_name);
    sessionStorage.setItem("loginfullname", loginfullname);
    sessionStorage.setItem("loginEmail", loginEmail);
    sessionStorage.setItem("loginMobile", loginMobile);
    sessionStorage.setItem("profile_photo", profile_photo);
    sessionStorage.setItem("kyc_current_status", kyc_current_status);
    sessionStorage.setItem("registered_status", "1");
    sessionStorage.setItem("login_pass", password);
    sessionStorage.setItem("user_type", user_type);
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("login_user_id");
    sessionStorage.removeItem("login_user_name");
    sessionStorage.removeItem("loginfullname");
    sessionStorage.removeItem("loginEmail");
    sessionStorage.removeItem("loginMobile");
    sessionStorage.removeItem("profile_photo");
    sessionStorage.removeItem("kyc_current_status");
  }
  // public get loggedIn(): boolean {
  //   return sessionStorage.getItem("currentUser") !== null;
  // }
}

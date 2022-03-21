import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AdminAuthenticationService {
  login(companyEmail: string, companyUsername: string, companyId: string) {
    sessionStorage.setItem("currentAdminLgn", "loggedin");
    sessionStorage.setItem("user_type", "admin");
    sessionStorage.setItem("companyEmail", companyEmail);
    sessionStorage.setItem("companyUsername", companyUsername);
    sessionStorage.setItem("companyId", companyId);
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentAdminLgn");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("companyEmail");
    sessionStorage.removeItem("companyUsername");
    sessionStorage.removeItem("companyId");
  }
  // public get loggedIn(): boolean {
  //   return sessionStorage.getItem("currentAdminLgn") !== null;
  // }
}

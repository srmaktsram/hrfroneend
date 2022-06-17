import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class SubAdminAuthenticationService {
  login() {
    sessionStorage.setItem("currentUser", "SubAdminLogin");
    sessionStorage.setItem("user_type", "subadmin");
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("mainadminrole");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

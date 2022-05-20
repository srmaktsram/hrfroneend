import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class MainAdminAuthenticationService {
  login() {
    sessionStorage.setItem("currentAdminLgn", "loggedin");
    sessionStorage.setItem("user_type", "mainadmin");
    sessionStorage.setItem("mainadminrole", "all");
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentAdminLgn");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("mainadminrole");
  }
  // public get loggedIn(): boolean {
  //   return sessionStorage.getItem("currentAdminLgn") !== null;
  // }
}

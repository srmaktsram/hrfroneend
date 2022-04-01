import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AdminAuthenticationService {
  login(
    id: string,
    companyEmail: string,
    companyName: string,
    companySite: string,
    companyId: string,
    pinCode: string,
    companyAddress: string
  ) {
    sessionStorage.setItem("currentAdminLgn", "loggedin");
    sessionStorage.setItem("user_type", "admin");
    sessionStorage.setItem("companyEmail", companyEmail);
    sessionStorage.setItem("adminId", id);
    sessionStorage.setItem("companyName", companyName);
    sessionStorage.setItem("companySite", companySite);
    sessionStorage.setItem("companyId", companyId);
    sessionStorage.setItem("pinCode", pinCode);
    sessionStorage.setItem("companyAddress", companyAddress);
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentAdminLgn");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("companyEmail");
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("companySite");
    sessionStorage.removeItem("companyId");
    sessionStorage.removeItem("pinCode");
    sessionStorage.removeItem("companyAddress");
  }
  // public get loggedIn(): boolean {
  //   return sessionStorage.getItem("currentAdminLgn") !== null;
  // }
}

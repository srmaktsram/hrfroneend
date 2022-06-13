import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AdminAuthenticationService {
  login(
    id: string,
    corporateId: string,
    companyEmail: string,
    companyName: string,
    companySite: string,
    pinCode: string,
    companyAddress: string,
    phone: string,
    mobile: string,
    location: Object,
    clogo: string,
    cinvoice: string,
    cinvoicepre: string
  ) {
    sessionStorage.setItem("currentUser", "AdminLogin");
    sessionStorage.setItem("user_type", "admin");
    sessionStorage.setItem("corporateId", corporateId);
    sessionStorage.setItem("adminId", id);
    sessionStorage.setItem("companyEmail", companyEmail);
    sessionStorage.setItem("companyName", companyName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("mobile", mobile);
    sessionStorage.setItem("companySite", companySite);
    sessionStorage.setItem("pinCode", pinCode);
    sessionStorage.setItem("companyAddress", companyAddress);
    sessionStorage.setItem("clogo", clogo);
    sessionStorage.setItem("cinvoice", cinvoice);
    sessionStorage.setItem("cinvoicepre", cinvoicepre);
    sessionStorage.setItem("current_location", JSON.stringify(location));
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("companyEmail");
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("companySite");

    sessionStorage.removeItem("pinCode");
    sessionStorage.removeItem("companyAddress");
    sessionStorage.removeItem("current_location");
    sessionStorage.removeItem("clogo");
    sessionStorage.removeItem("cinvoice");
    sessionStorage.removeItem("cinvoicepre");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

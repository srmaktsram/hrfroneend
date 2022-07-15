import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleReceptionistAuthenticationService {
  login(
    user_type,
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
    cinvoicepre: string,
    packageName: string,
    supportticketsreadRecep: string,
    supportticketswriteRecep: string,
    policiesreadRecep: string,
    policieswriteRecep: string,
    userdashboardreadRecep: string,
    userdashboardwriteRecep: string,
    jobdashboardreadRecep: string,
    jobdashboardwriteRecep: string,
    shortlistedcandidatesreadRecep: string,
    shortlistedcandidateswriteRecep: string,
    candidateslistreadRecep: string,
    candidateslistwriteRecep: string,
    scheduletimingsreadRecep: string,
    scheduletimingwriteRecep: string,
    appliedCandidatesreadRecep: string,
    appliedCandidateswriteRecep: string,
    
  ) {
    sessionStorage.setItem("currentUser", "AdminLogin");
    sessionStorage.setItem("user_type", user_type);
    sessionStorage.setItem("corporateId", corporateId);
    sessionStorage.setItem("packageName", packageName);
    sessionStorage.setItem("packageName", packageName);
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

    sessionStorage.setItem("supportticketsreadRecep", supportticketsreadRecep);
    sessionStorage.setItem("supportticketswriteRecep", supportticketswriteRecep);
    sessionStorage.setItem("policiesreadRecep", policiesreadRecep);
    sessionStorage.setItem("policieswriteRecep", policieswriteRecep);
    sessionStorage.setItem("userdashboardreadRecep", userdashboardreadRecep);
    sessionStorage.setItem("userdashboardwriteRecep", userdashboardwriteRecep);
    sessionStorage.setItem("jobdashboardreadRecep", jobdashboardreadRecep);
    sessionStorage.setItem("jobdashboardwriteRecep", jobdashboardwriteRecep);
    sessionStorage.setItem("shortlistedcandidatesreadRecep", shortlistedcandidatesreadRecep);
    sessionStorage.setItem("shortlistedcandidateswriteRecep", shortlistedcandidateswriteRecep);
    sessionStorage.setItem("candidateslistreadRecep", candidateslistreadRecep);
    sessionStorage.setItem("candidateslistwriteRecep", candidateslistwriteRecep);
    sessionStorage.setItem("scheduletimingsreadRecep", scheduletimingsreadRecep);
    sessionStorage.setItem("scheduletimingwriteRecep", scheduletimingwriteRecep);
    sessionStorage.setItem("appliedCandidatesreadRecep", appliedCandidatesreadRecep);
    sessionStorage.setItem("appliedCandidateswriteRecep", appliedCandidateswriteRecep);

   

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

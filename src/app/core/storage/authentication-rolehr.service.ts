import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleHrAuthenticationService {
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
    jobsreadHr: string,
    jobswriteHr: string,
    policiesreadHr: string,
    policieswriteHr: string,
    supportticketsreadHr: string,
    supportticketswriteHr: string,
    trainingreadHr: string,
    trainingwriteHr: string,
    performancereadHr: string,
    performancewriteHr: string,
    payrollsreadHr: string,
    payrollswriteHr: string,
    attendancereadHr: string,
    attendancewriteHr: string,
    
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

    sessionStorage.setItem("jobsreadHr", jobsreadHr);
    sessionStorage.setItem("jobswriteHr", jobswriteHr);
    sessionStorage.setItem("policiesreadHr", policiesreadHr);
    sessionStorage.setItem("policieswriteHr", policieswriteHr);
    sessionStorage.setItem("supportticketsreadHr", supportticketsreadHr);
    sessionStorage.setItem("supportticketswriteHr", supportticketswriteHr);
    sessionStorage.setItem("trainingreadHr", trainingreadHr);
    sessionStorage.setItem("trainingwriteHr", trainingwriteHr);
    sessionStorage.setItem("performancereadHr", performancereadHr);
    sessionStorage.setItem("performancewriteHr", performancewriteHr);
    sessionStorage.setItem("payrollsreadHr", payrollsreadHr);
    sessionStorage.setItem("payrollswriteHr", payrollswriteHr);
    sessionStorage.setItem("attendancereadHr", attendancereadHr);
    sessionStorage.setItem("attendancewriteHr", attendancewriteHr);

    

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

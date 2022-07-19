import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleManagerAuthenticationService {
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
    usersReadMan: string,
    usersWriteMan: string,
    policiesReadMan: string,
    policiesWriteMan: string,
    supportTicketsReadMan: string,
    supportTicketsWriteMan: string,
    clientsReadMan: string,
    clientsWriteMan: string,
    assetsReadMan: string,
    assetsWriteMan: string,
    roleDetails: any
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
    sessionStorage.setItem("role_details", JSON.stringify(roleDetails));

    sessionStorage.setItem("usersReadMan", usersReadMan);
    sessionStorage.setItem("usersWriteMan", usersWriteMan);
    sessionStorage.setItem("policiesReadMan", policiesReadMan);
    sessionStorage.setItem("policiesWriteMan", policiesWriteMan);
    sessionStorage.setItem("supportTicketsReadMan", supportTicketsReadMan);
    sessionStorage.setItem("supportTicketsWriteMan", supportTicketsWriteMan);
    sessionStorage.setItem("clientsReadMan", clientsReadMan);
    sessionStorage.setItem("clientsWriteMan", clientsWriteMan);
    sessionStorage.setItem("assetsReadMan", assetsReadMan);
    sessionStorage.setItem("assetsWriteMan", assetsWriteMan);

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
    sessionStorage.removeItem("role_details");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleFinanceAuthenticationService {
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
    reportsReadFin: string,
    reportsWriteFin: string,
    accountingreadFin: string,
    accountingwriteFin: string,
    salesreadFin: string,
    saleswriteFin: string,
    policiesReadFin: string,
    policiesWritefin: string,
    assetsReadFin: string,
    assetsWriteFin: string,
    supportTicketsReadFin: string,
    supportTicketsWriteFin: string,
    
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
    
    sessionStorage.setItem("reportsReadFin", reportsReadFin);
    sessionStorage.setItem("reportsWriteFin", reportsWriteFin);
    sessionStorage.setItem("accountingreadFin", accountingreadFin);
    sessionStorage.setItem("accountingwriteFin", accountingwriteFin);
    sessionStorage.setItem("salesreadFin", salesreadFin);
    sessionStorage.setItem("saleswriteFin", saleswriteFin);
    sessionStorage.setItem("policiesReadFin", policiesReadFin);
    sessionStorage.setItem("policiesWritefin", policiesWritefin);
    sessionStorage.setItem("assetsReadFin", assetsReadFin);
    sessionStorage.setItem("assetsWriteFin", assetsWriteFin);
    sessionStorage.setItem("supportTicketsReadFin", supportTicketsReadFin);
    sessionStorage.setItem("supportTicketsWriteFin", supportTicketsWriteFin);

   
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

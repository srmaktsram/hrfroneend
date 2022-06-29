import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class SubAdminAuthenticationService {
  login(
    dashboardread: string,
    dashboardwrite: string,
    freeClientsread: string,
    freeClientswrite: string,
    invoicesread: string,
    invoiceswrite: string,
    subadminread: string,
    subadminwrite: string,
    premiumClientsread: string,
    premiumClientswrite: string,
    ticketsread: string,
    ticketswrite: string,
    visitorClientsread: string,
    visitorClientswrite: string,
    affiliatesread: string,
    affiliateswrite: string,
    commissionsread: string,
    commissionswrite: string,
    paymentsread: string,
    paymentswrite: string,
    kycread: string,
    kycwrite: string,
    withdrawalrequestread: string,
    withdrawalrequestwrite: string,
    promocoderead: string,
    promocodewrite: string,
  ) {
    sessionStorage.setItem("currentUser", "SubAdminLogin");
    sessionStorage.setItem("user_type", "subadmin");
    sessionStorage.setItem("dashboardread", dashboardread);
    sessionStorage.setItem("dashboardwrite", dashboardwrite);
    sessionStorage.setItem("freeClientsread", freeClientsread);
    sessionStorage.setItem("freeClientswrite", freeClientswrite);
    sessionStorage.setItem("invoicesread", invoicesread);
    sessionStorage.setItem("invoiceswrite", invoiceswrite);
    sessionStorage.setItem("subadminread", subadminread);
    sessionStorage.setItem("subadminwrite", subadminwrite);
    sessionStorage.setItem("premiumClientsread", premiumClientsread);
    sessionStorage.setItem("premiumClientswrite", premiumClientswrite);
    sessionStorage.setItem("ticketsread", ticketsread);
    sessionStorage.setItem("ticketswrite", ticketswrite);
    sessionStorage.setItem("visitorClientsread", visitorClientsread);
    sessionStorage.setItem("visitorClientswrite", visitorClientswrite);
    sessionStorage.setItem("affiliatesread", affiliatesread);
    sessionStorage.setItem("affiliateswrite", affiliateswrite);
    sessionStorage.setItem("commissionsread", commissionsread);
    sessionStorage.setItem("commissionswrite", commissionswrite);
    sessionStorage.setItem("paymentsread", paymentsread);
    sessionStorage.setItem("paymentswrite", paymentswrite);
    sessionStorage.setItem("kycread", kycread);
    sessionStorage.setItem("kycwrite", kycwrite);
    sessionStorage.setItem("withdrawalrequestread", withdrawalrequestread);
    sessionStorage.setItem("withdrawalrequestwrite", withdrawalrequestwrite);
    sessionStorage.setItem("promocoderead", promocoderead);
    sessionStorage.setItem("promocodewrite", promocodewrite);
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("mainadminrole");
    sessionStorage.removeItem("mainadminrole");
    sessionStorage.removeItem("mainadminrole");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

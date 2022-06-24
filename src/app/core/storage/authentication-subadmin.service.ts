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
    ordersread: string,
    orderswrite: string,
    premiumClientsread: string,
    premiumClientswrite: string,
    ticketsread: string,
    ticketswrite: string,
    visitorClientsread: string,
    visitorClientswrite: string
  ) {
    sessionStorage.setItem("currentUser", "SubAdminLogin");
    sessionStorage.setItem("user_type", "subadmin");
    sessionStorage.setItem("dashboardread", dashboardread);
    sessionStorage.setItem("dashboardwrite", dashboardwrite);
    sessionStorage.setItem("freeClientsread", freeClientsread);
    sessionStorage.setItem("freeClientswrite", freeClientswrite);
    sessionStorage.setItem("invoicesread", invoicesread);
    sessionStorage.setItem("invoiceswrite", invoiceswrite);
    sessionStorage.setItem("ordersread", ordersread);
    sessionStorage.setItem("orderswrite", orderswrite);
    sessionStorage.setItem("premiumClientsread", premiumClientsread);
    sessionStorage.setItem("premiumClientswrite", premiumClientswrite);
    sessionStorage.setItem("ticketsread", ticketsread);
    sessionStorage.setItem("ticketswrite", ticketswrite);
    sessionStorage.setItem("visitorClientsread", visitorClientsread);
    sessionStorage.setItem("visitorClientswrite", visitorClientswrite);
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

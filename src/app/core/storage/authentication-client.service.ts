import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class ClientAuthenticationService {
  login(id: string, adminId: string) {
    sessionStorage.setItem("currentUser", "ClientLogin");
    sessionStorage.setItem("user_type", "client");
    sessionStorage.setItem("clientId", id);
    sessionStorage.setItem("adminId", adminId);

    return true;
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("adminId");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

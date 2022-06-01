import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class ClientAuthenticationService {
  login(id: string) {
    sessionStorage.setItem("currentUser", "loggedin");
    sessionStorage.setItem("user_type", "client");
    sessionStorage.setItem("clientId", id);

    return true;
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("clientId");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

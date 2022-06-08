import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AffilateAuthenticationService {
  login(
    id: string
    // username: string,
    // email: string,
    // firstName: string,
    // lastName: string,
    // phone: string
  ) {
    sessionStorage.setItem("currentUser", "loggedin");
    sessionStorage.setItem("user_type", "affiliate");
    sessionStorage.setItem("affiliateId", id);
    // sessionStorage.setItem("username", username);
    // sessionStorage.setItem("email", email);
    // sessionStorage.setItem("firstName", firstName);
    // sessionStorage.setItem("lastName", lastName);
    // sessionStorage.setItem("phone", phone);
    //
    return true;
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("affilateId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("phone");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class HrUserAuthenticationService {
  login(
    id: string,
    corporateId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    sessionStorage.setItem("currentHrUserLgn", "loggedin");
    sessionStorage.setItem("user_type", "hrUser");
    sessionStorage.setItem("corporateId", corporateId);
    sessionStorage.setItem("hrUserId", id);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("lastName", lastName);
    return true;
  }
  logout() {
    sessionStorage.removeItem("currentHrUserLgn");
    sessionStorage.removeItem("corporateId");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("hrUserId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentHrUserLgn") !== null;
  }
}

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
    sessionStorage.setItem("currentUserLogin", "HrUserLogin");
    sessionStorage.setItem("type_user", "hrUser");
    sessionStorage.setItem("corporateId", corporateId);
    sessionStorage.setItem("hrUserId", id);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("lastName", lastName);

    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUserLogin");
    sessionStorage.removeItem("corporateId");
    sessionStorage.removeItem("type_user");
    sessionStorage.removeItem("hrUserId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUserLogin") !== null;
  }
}

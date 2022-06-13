import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AffilateAuthenticationService {
  login(
    id: string,
    bankDetails: Object,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    aId: any
  ) {
    sessionStorage.setItem("currentUser", "AffiliateLogin");
    sessionStorage.setItem("user_type", "affiliate");

    sessionStorage.setItem("affiliateId", id);
    sessionStorage.setItem("bankDetails", JSON.stringify(bankDetails));
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("first_name", first_name);
    sessionStorage.setItem("last_name", last_name);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("aId", aId);

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
    sessionStorage.removeItem("aId");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

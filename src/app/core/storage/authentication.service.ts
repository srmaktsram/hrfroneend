import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  login(
    adminId: string,
    id: string,
    username: string,
    employeeId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    sessionStorage.setItem("currentUser", "loggedin");
    sessionStorage.setItem("user_type", "employee");
    sessionStorage.setItem("adminId", adminId);
    sessionStorage.setItem("empployee_login_id", id);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("employeeId", employeeId);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("phone", phone);

    return true;
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("empployee_login_id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("phone");
  }
  // public get loggedIn(): boolean {
  //   return sessionStorage.getItem("currentUser") !== null;
  // }
}

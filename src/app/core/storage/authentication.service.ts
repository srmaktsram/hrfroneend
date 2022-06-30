import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private router: Router) {}

  login(
    adminId: string,
    id: string,
    username: string,
    employeeId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    location: Object,
    leavesread: string,
    leaveswrite: string,
    attendanceread: string,
    attendancewrite: string,
    timesheetread: string,
    timesheetwrite: string,
    clientsread: string,
    clientswrite: string,
    projectsread: string,
    projectswrite: string,
    holidaysread: string,
    holidayswrite: string,
  ) {
    sessionStorage.setItem("currentUser", "EmployeeLogin");
    sessionStorage.setItem("user_type", "employee");
    sessionStorage.setItem("adminId", adminId);
    sessionStorage.setItem("employee_login_id", id);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("employeeId", employeeId);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("leavesread", leavesread);
    sessionStorage.setItem("leaveswrite", leaveswrite);
    sessionStorage.setItem("attendanceread", attendanceread);
    sessionStorage.setItem("attendancewrite", attendancewrite);
    sessionStorage.setItem("timesheetread", timesheetread);
    sessionStorage.setItem("timesheetwrite", timesheetwrite);
    sessionStorage.setItem("clientsread", clientsread);
    sessionStorage.setItem("clientswrite", clientswrite);
    sessionStorage.setItem("projectsread", projectsread);
    sessionStorage.setItem("projectswrite", projectswrite);
    sessionStorage.setItem("holidaysread", holidaysread);
    sessionStorage.setItem("holidayswrite", holidayswrite);

    sessionStorage.setItem("current_location", JSON.stringify(location));
    this.router.navigate(["/layout/dashboard/employee"]);
    return true;
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("employee_login_id");
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

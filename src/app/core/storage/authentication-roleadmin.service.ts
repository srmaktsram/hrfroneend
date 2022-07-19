import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleAdminAuthenticationService {
  login(
    user_type,
    id: string,
    corporateId: string,
    companyEmail: string,
    companyName: string,
    companySite: string,
    pinCode: string,
    companyAddress: string,
    phone: string,
    mobile: string,
    location: Object,
    clogo: string,
    cinvoice: string,
    cinvoicepre: string,
    packageName: string,
    dashboardRead: string,
    dashboardWrite: string,
    appsread: string,
    appswrite: string,
    employeeread: string,
    employeewrite: string,
    supportTicketsRead: string,
    supportTicketsWrite: string,
    clientsRead: string,
    clientsWrite: string,
    projectsRead: string,
    projectsWrite: string,
    leadsread: string,
    leadswrite: string,
    ticketsRead: string,
    ticketsWrite: string,
    salesread: string,
    saleswrite: string,
    accountingread: string,
    accountingwrite: string,
    payrollRead: string,
    payrollWrite: string,
    policiesRead: string,
    policiesWrite: string,
    reportsRead: string,
    reportsWrite: string,
    performanceRead: string,
    performanceWrite: string,
    goalsRead: string,
    goalsWrite: string,
    trainingsRead: string,
    trainingsWrite: string,
    promotionRead: string,
    promotionWrite: string,
    resignationRead: string,
    resignationWrite: string,
    terminationRead: string,
    terminationWrite: string,
    assetsRead: string,
    assetsWrite: string,
    jobsRead: string,
    jobsWrite: string,
    konowledgeBaseread: string,
    konwledgeBaseWrite: string,
    activitiesRead: string,
    activitiesWrite: string,
    usersRead: string,
    usersWrite: string,
    settingsRead: string,
    settingsWrite: string,
    roleDetails: any
  ) {
    sessionStorage.setItem("currentUser", "AdminLogin");
    sessionStorage.setItem("user_type", user_type);
    sessionStorage.setItem("corporateId", corporateId);
    sessionStorage.setItem("packageName", packageName);
    sessionStorage.setItem("packageName", packageName);
    sessionStorage.setItem("adminId", id);
    sessionStorage.setItem("companyEmail", companyEmail);
    sessionStorage.setItem("companyName", companyName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("mobile", mobile);
    sessionStorage.setItem("companySite", companySite);
    sessionStorage.setItem("pinCode", pinCode);
    sessionStorage.setItem("companyAddress", companyAddress);
    sessionStorage.setItem("clogo", clogo);
    sessionStorage.setItem("cinvoice", cinvoice);
    sessionStorage.setItem("cinvoicepre", cinvoicepre);
    sessionStorage.setItem("current_location", JSON.stringify(location));
    sessionStorage.setItem("role_details", JSON.stringify(roleDetails));
    sessionStorage.setItem("dashboardRead", dashboardRead);
    sessionStorage.setItem("dashboardWrite", dashboardWrite);

    sessionStorage.setItem("appsread", appsread);
    sessionStorage.setItem("appswrite", appswrite);
    sessionStorage.setItem("employeeread", employeeread);
    sessionStorage.setItem("employeewrite", employeewrite);
    sessionStorage.setItem("supportTicketsRead", supportTicketsRead);
    sessionStorage.setItem("supportTicketsWrite", supportTicketsWrite);
    sessionStorage.setItem("clientsRead", clientsRead);
    sessionStorage.setItem("clientsWrite", clientsWrite);
    sessionStorage.setItem("projectsRead", projectsRead);
    sessionStorage.setItem("projectsWrite", projectsWrite);
    sessionStorage.setItem("leadsread", leadsread);
    sessionStorage.setItem("leadswrite", leadswrite);
    sessionStorage.setItem("ticketsRead", ticketsRead);
    sessionStorage.setItem("ticketsWrite", ticketsWrite);
    sessionStorage.setItem("salesread", salesread);
    sessionStorage.setItem("saleswrite", saleswrite);
    sessionStorage.setItem("accountingread", accountingread);
    sessionStorage.setItem("accountingwrite", accountingwrite);
    sessionStorage.setItem("payrollRead", payrollRead);
    sessionStorage.setItem("payrollWrite", payrollWrite);
    sessionStorage.setItem("policiesRead", policiesRead);
    sessionStorage.setItem("policiesWrite", policiesWrite);
    sessionStorage.setItem("reportsRead", reportsRead);
    sessionStorage.setItem("reportsWrite", reportsWrite);
    sessionStorage.setItem("performanceRead", performanceRead);
    sessionStorage.setItem("performanceWrite", performanceWrite);
    sessionStorage.setItem("goalsRead", goalsRead);
    sessionStorage.setItem("goalsWrite", goalsWrite);
    sessionStorage.setItem("trainingsRead", trainingsRead);
    sessionStorage.setItem("trainingsWrite", trainingsWrite);
    sessionStorage.setItem("promotionRead", promotionRead);
    sessionStorage.setItem("promotionWrite", promotionWrite);
    sessionStorage.setItem("resignationRead", resignationRead);
    sessionStorage.setItem("resignationWrite", resignationWrite);
    sessionStorage.setItem("terminationRead", terminationRead);
    sessionStorage.setItem("terminationWrite", terminationWrite);
    sessionStorage.setItem("assetsRead", assetsRead);
    sessionStorage.setItem("assetsWrite", assetsWrite);
    sessionStorage.setItem("jobsRead", jobsRead);
    sessionStorage.setItem("jobsWrite", jobsWrite);
    sessionStorage.setItem("konowledgeBaseread", konowledgeBaseread);
    sessionStorage.setItem("konwledgeBaseWrite", konwledgeBaseWrite);
    sessionStorage.setItem("activitiesRead", activitiesRead);
    sessionStorage.setItem("activitiesWrite", activitiesWrite);
    sessionStorage.setItem("usersRead", usersRead);
    sessionStorage.setItem("usersWrite", usersWrite);
    sessionStorage.setItem("settingsRead", settingsRead);
    sessionStorage.setItem("settingsWrite", settingsWrite);

    return true;
  }
  logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("companyEmail");
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("companySite");

    sessionStorage.removeItem("pinCode");
    sessionStorage.removeItem("companyAddress");
    sessionStorage.removeItem("current_location");
    sessionStorage.removeItem("clogo");
    sessionStorage.removeItem("cinvoice");
    sessionStorage.removeItem("cinvoicepre");
    sessionStorage.removeItem("role_details");
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem("currentUser") !== null;
  }
}

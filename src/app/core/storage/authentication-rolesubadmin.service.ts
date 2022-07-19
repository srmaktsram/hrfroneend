import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class RoleSubAdminAuthenticationService {
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
    dashboardreadSub: string,
    dashboardwriteSub: string,
    appsreadSub: string,
    appswriteSub: string,
    employeereadSub: string,
    employeewriteSub: string,
    supportTicketsReadSub: string,
    supportTicketsWriteSub: string,
    clientsReadSub: string,
    clientsWriteSub: string,
    projectsReadSub: string,
    projectsWriteSub: string,
    leadsreadSub: string,
    leadswriteSub: string,
    ticketsReadSub: string,
    ticketsWriteSub: string,
    salesreadSub: string,
    saleswriteSub: string,
    accountingreadSub: string,
    accountingwriteSub: string,
    payrollReadSub: string,
    payrollWriteSub: string,
    policiesReadSub: string,
    policiesWriteSub: string,
    reportsReadSub: string,
    reportsWriteSub: string,
    performanceReadSub: string,
    performanceWriteSub: string,
    goalsReadSub: string,
    goalsWriteSub: string,
    trainingsReadSub: string,
    trainingsWriteSub: string,
    promotionReadSub: string,
    promotionWriteSub: string,
    resignationReadSub: string,
    resignationWriteSub: string,
    terminationReadSub: string,
    terminationWriteSub: string,
    assetsReadSub: string,
    assetsWriteSub: string,
    jobsReadSub: string,
    jobsWriteSub: string,
    konowledgeBasereadSub: string,
    konwledgeBaseWriteSub: string,
    activitiesReadSub: string,
    activitiesWriteSub: string,
    usersReadSub: string,
    usersWriteSub: string,
    settingsReadSub: string,
    settingsWriteSub: string,
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
    sessionStorage.setItem("dashboardreadSub", dashboardreadSub);
    sessionStorage.setItem("dashboardwriteSub", dashboardwriteSub);
    sessionStorage.setItem("appsreadSub", appsreadSub);
    sessionStorage.setItem("appswriteSub", appswriteSub);
    sessionStorage.setItem("employeereadSub", employeereadSub);
    sessionStorage.setItem("employeewriteSub", employeewriteSub);
    sessionStorage.setItem("supportTicketsReadSub", supportTicketsReadSub);
    sessionStorage.setItem("supportTicketsWriteSub", supportTicketsWriteSub);
    sessionStorage.setItem("clientsReadSub", clientsReadSub);
    sessionStorage.setItem("clientsWriteSub", clientsWriteSub);
    sessionStorage.setItem("projectsReadSub", projectsReadSub);
    sessionStorage.setItem("projectsWriteSub", projectsWriteSub);
    sessionStorage.setItem("leadsreadSub", leadsreadSub);
    sessionStorage.setItem("leadswriteSub", leadswriteSub);
    sessionStorage.setItem("ticketsReadSub", ticketsReadSub);
    sessionStorage.setItem("ticketsWriteSub", ticketsWriteSub);
    sessionStorage.setItem("salesreadSub", salesreadSub);
    sessionStorage.setItem("saleswriteSub", saleswriteSub);
    sessionStorage.setItem("accountingreadSub", accountingreadSub);
    sessionStorage.setItem("accountingwriteSub", accountingwriteSub);
    sessionStorage.setItem("payrollReadSub", payrollReadSub);
    sessionStorage.setItem("payrollWriteSub", payrollWriteSub);
    sessionStorage.setItem("policiesReadSub", policiesReadSub);
    sessionStorage.setItem("policiesWriteSub", policiesWriteSub);
    sessionStorage.setItem("reportsReadSub", reportsReadSub);
    sessionStorage.setItem("reportsWriteSub", reportsWriteSub);
    sessionStorage.setItem("performanceReadSub", performanceReadSub);
    sessionStorage.setItem("performanceWriteSub", performanceWriteSub);
    sessionStorage.setItem("goalsReadSub", goalsReadSub);
    sessionStorage.setItem("goalsWriteSub", goalsWriteSub);
    sessionStorage.setItem("trainingsReadSub", trainingsReadSub);
    sessionStorage.setItem("trainingsWriteSub", trainingsWriteSub);
    sessionStorage.setItem("promotionReadSub", promotionReadSub);
    sessionStorage.setItem("promotionWriteSub", promotionWriteSub);
    sessionStorage.setItem("resignationReadSub", resignationReadSub);
    sessionStorage.setItem("resignationWriteSub", resignationWriteSub);
    sessionStorage.setItem("terminationReadSub", terminationReadSub);
    sessionStorage.setItem("terminationWriteSub", terminationWriteSub);
    sessionStorage.setItem("assetsReadSub", assetsReadSub);
    sessionStorage.setItem("assetsWriteSub", assetsWriteSub);
    sessionStorage.setItem("jobsReadSub", jobsReadSub);
    sessionStorage.setItem("jobsWriteSub", jobsWriteSub);
    sessionStorage.setItem("konowledgeBasereadSub", konowledgeBasereadSub);
    sessionStorage.setItem("konwledgeBaseWriteSub", konwledgeBaseWriteSub);
    sessionStorage.setItem("activitiesReadSub", activitiesReadSub);
    sessionStorage.setItem("activitiesWriteSub", activitiesWriteSub);
    sessionStorage.setItem("usersReadSub", usersReadSub);
    sessionStorage.setItem("usersWriteSub", usersWriteSub);
    sessionStorage.setItem("settingsReadSub", settingsReadSub);
    sessionStorage.setItem("settingsWriteSub", settingsWriteSub);
    sessionStorage.setItem("role_details", JSON.stringify(roleDetails));

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

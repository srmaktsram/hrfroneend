import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { AllModulesService } from "../all-modules/all-modules.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  members = {};
  groups = {};
  user_type: any;
  

  //subadmin autority
  dashboardread = sessionStorage.getItem("dashboardread");
  dashboardwrite = sessionStorage.getItem("dashboardwrite");
  freeClientsread = sessionStorage.getItem("freeClientsread");
  freeClientswrite = sessionStorage.getItem("freeClientswrite");
  invoicesread = sessionStorage.getItem("invoicesread");
  invoiceswrite = sessionStorage.getItem("invoiceswrite");
  subadminread = sessionStorage.getItem("subadminread");
  subadminwrite = sessionStorage.getItem("subadminwrite");
  premiumClientsread = sessionStorage.getItem("premiumClientsread");
  premiumClientswrite = sessionStorage.getItem("premiumClientswrite");
  ticketsread = sessionStorage.getItem("ticketsread");
  ticketswrite = sessionStorage.getItem("ticketswrite");
  visitorClientsread = sessionStorage.getItem("visitorClientsread");
  visitorClientswrite = sessionStorage.getItem("visitorClientswrite");
  affiliatesread = sessionStorage.getItem("affiliatesread");
  affiliateswrite = sessionStorage.getItem("affiliateswrite");
  commissionsread = sessionStorage.getItem("commissionsread");
  commissionswrite = sessionStorage.getItem("commissionswrite");
  paymentsread = sessionStorage.getItem("paymentsread");
  paymentswrite = sessionStorage.getItem("paymentswrite");
  kycread = sessionStorage.getItem("kycread");
  kycwrite = sessionStorage.getItem("kycwrite");
  withdrawalrequestread = sessionStorage.getItem("withdrawalrequestread");
  withdrawalrequestwrite = sessionStorage.getItem("withdrawalrequestwrite");
  promocoderead = sessionStorage.getItem("promocoderead");
  promocodewrite = sessionStorage.getItem("promocodewrite");
  //////
  ///////////Admin Authority////////////////
  leavesread = sessionStorage.getItem("leavesread");
  leaveswrite = sessionStorage.getItem("leaveswrite");
  attendanceread = sessionStorage.getItem("attendanceread");
  attendancewrite = sessionStorage.getItem("attendancewrite");
  timesheetread = sessionStorage.getItem("timesheetread");
  timesheetwrite = sessionStorage.getItem("timesheetwrite");
  clientsread = sessionStorage.getItem("clientsread");
  clientswrite = sessionStorage.getItem("clientswrite");
  projectsread = sessionStorage.getItem("projectsread");
  projectswrite = sessionStorage.getItem("projectswrite");
  holidaysread = sessionStorage.getItem("holidaysread");
  holidayswrite = sessionStorage.getItem("holidayswrite");
  //////////

  ///////////////
  dashboardRead = sessionStorage.getItem("dashboardRead");
  dashboardWrite = sessionStorage.getItem("dashboardWrite");
  appsread = sessionStorage.getItem("appsread");
  appswrite = sessionStorage.getItem("appswrite");
  employeeread = sessionStorage.getItem("employeeread");
  employeewrite = sessionStorage.getItem("employeewrite");
  supportTicketsRead = sessionStorage.getItem("supportTicketsRead");
  supportTicketsWrite = sessionStorage.getItem("supportTicketsWrite");
  clientsRead = sessionStorage.getItem("clientsRead");
  clientsWrite = sessionStorage.getItem("clientsWrite");
  projectsRead = sessionStorage.getItem("projectsRead");
  projectsWrite = sessionStorage.getItem("projectsWrite");
  leadsread = sessionStorage.getItem("leadsread");
  leadswrite = sessionStorage.getItem("leadswrite");
  ticketsRead = sessionStorage.getItem("ticketsRead");
  ticketsWrite = sessionStorage.getItem("ticketsWrite");
  salesread = sessionStorage.getItem("salesread");
  saleswrite = sessionStorage.getItem("saleswrite");
  accountingread = sessionStorage.getItem("accountingread");
  accountingwrite = sessionStorage.getItem("accountingwrite");

  payrollRead = sessionStorage.getItem("payrollRead");
  payrollWrite = sessionStorage.getItem("payrollWrite");

  policiesRead = sessionStorage.getItem("policiesRead");
  policiesWrite = sessionStorage.getItem("policiesWrite");

  reportsRead = sessionStorage.getItem("reportsRead");
  reportsWrite = sessionStorage.getItem("reportsWrite");

  performanceRead = sessionStorage.getItem("performanceRead");
  performanceWrite = sessionStorage.getItem("performanceWrite");

  goalsRead = sessionStorage.getItem("goalsRead");
  goalsWrite = sessionStorage.getItem("goalsWrite");

  trainingsRead = sessionStorage.getItem("trainingsRead");
  trainingsWrite = sessionStorage.getItem("trainingsWrite");

  promotionRead = sessionStorage.getItem("promotionRead");
  promotionWrite = sessionStorage.getItem("promotionWrite");

  resignationRead = sessionStorage.getItem("resignationRead");
  resignationWrite = sessionStorage.getItem("resignationWrite");

  terminationRead = sessionStorage.getItem("terminationRead");
  terminationWrite = sessionStorage.getItem("terminationWrite");
  
  assetsRead = sessionStorage.getItem("assetsRead");
  assetsWrite = sessionStorage.getItem("assetsWrite");

  jobsRead = sessionStorage.getItem("jobsRead");
  jobsWrite = sessionStorage.getItem("jobsWrite");

  konowledgeBaseread = sessionStorage.getItem("konowledgeBaseread");
  konwledgeBaseWrite = sessionStorage.getItem("konwledgeBaseWrite");

  activitiesRead = sessionStorage.getItem("activitiesRead");
  activitiesWrite = sessionStorage.getItem("activitiesWrite");

  usersRead = sessionStorage.getItem("usersRead");
  usersWrite = sessionStorage.getItem("usersWrite");

  settingsRead = sessionStorage.getItem("settingsRead");
  settingsWrite = sessionStorage.getItem("settingsWrite");
 

  constructor(
    private router: Router,
    private allModulesService: AllModulesService
  ) {

    this.user_type = sessionStorage.getItem("user_type");
    alert(this.user_type)
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $(".main-wrapper").removeClass("slide-nav");
        $(".sidebar-overlay").removeClass("opened");
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[2];
        this.urlComplete.subUrl = url[3];
        this.urlComplete.childUrl = url[4];
        if (url[2] === "") {
          this.urlComplete.mainUrl = "dashboard";
          this.urlComplete.subUrl = "admin";
        }

        if (url[3] === "chat" || url[3] === "calls") {
          this.sidebarMenus.chat = true;
          this.sidebarMenus.default = false;
        } else {
          this.sidebarMenus.chat = false;
          this.sidebarMenus.default = true;
        }
      }
    });

    this.groups = { ...this.allModulesService.groups };
    this.members = { ...this.allModulesService.members };
  }

  ngOnInit() {
    // Slide up and down of menus
    $(document).on("click", "#sidebar-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }

  setActive(member) {
    this.allModulesService.members.active = member;
  }
}

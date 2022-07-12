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

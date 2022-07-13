import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminAuthenticationService } from "../core/storage/authentication-admin.service";
import { AffilateAuthenticationService } from "../core/storage/authentication-affiliate.service";
import { ClientAuthenticationService } from "../core/storage/authentication-client.service";
import { MainAdminAuthenticationService } from "../core/storage/authentication-mainadmin.service";
import { SubAdminAuthenticationService } from "../core/storage/authentication-subadmin.service";
import { AuthenticationService } from "../core/storage/authentication.service";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  jsonData: any = {
    message: [],
  };

  notifications: any;
  messagesData: any;
  user_type: string;
  public adminId = sessionStorage.getItem("adminId");

  current_location: any;
  languages: any;
  companyName: string;
  companyLogo: string;
  flag: string;
  dataArray: any;
  lengthCount: any;
  newData: any;
  newStatus = true;
  leaves: boolean;
  lstHolidays: any;
  holiday: boolean;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private adminAuthenticationService: AdminAuthenticationService,
    private mainAdminAuthenticationService: MainAdminAuthenticationService,
    private affilateAuthenticationService: AffilateAuthenticationService,
    private clientAuthenticationService: ClientAuthenticationService,
    private subAdminAuthenticationService: SubAdminAuthenticationService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");

    this.companyName = sessionStorage.getItem("companyName");
    this.companyLogo = `http://localhost:8443/${sessionStorage.getItem(
      "clogo"
    )}`;
    // this.current_location = JSON.parse(
    //   sessionStorage.getItem("current_location")
    // );
    // this.flag = `https://assets.ipstack.com/flags/${this.current_location.country_code.toLowerCase()}.svg`;
  }

  // getNotifications() {
  //   this.http
  //     .get(
  //       "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
  //         "/" +
  //         this.adminId
  //     )
  //     .subscribe((data: any) => {
  //       this.leaves = data[0].notification.leaves;
  //       this.holiday = data[0].notification.holidays;
  //       this.getLeaveNotifications();
  //       this.loadHolidaysNotifications();

  //     });
  // }

  // loadLeaves() {
  //   if (this.user_type == "admin") {
  //     if (this.employee == true) {
  //       this.http
  //         .get(
  //           "http://localhost:8443/admin/leaves/searchleaves" +
  //             "/" +
  //             this.adminId
  //         )
  //         .subscribe((data: any) => {
  //           this.dataArray = data;
  //           this.lengthCount=this.dataArray.length

  //         });
  //     }
  //   }
  // }
  //////Get leave Notifications......
  public getAllNotifications() {
    if (this.user_type == "admin") {
      this.http
        .get(
          "http://localhost:8443/admin/notifications/getAllNotification" +
          "/" +
          this.adminId
        )
        .subscribe((data: any) => {
          this.dataArray = data[0].notifications;
          this.lengthCount = this.dataArray.length;

          if (this.lengthCount <= 4) {
            this.newStatus = true;
          } else if (this.lengthCount >= 5) {
            this.newStatus = false;
          }
        });
    }
  }

  //////////
  // loadHolidaysNotifications() {
  //   if (this.user_type == "admin") {
  //     if (this.holiday == true) {

  //   this.http.get("http://localhost:8443/admin/holidays/getNotification"+"/"+this.adminId).subscribe((res: any) => {
  //     this.lstHolidays = res;

  //   });}}
  // }

  ngOnInit() {
    this.getAllNotifications();

    // console.log(JSON.parse(sessionStorage.getItem("current_location")));

    // this.getDatas("notification");
    // this.getDatas("message");
    // this.languages = this.current_location.location.languages;

    this.messagesData = [
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
    ];
  }

  getDatas(section) {
    this.headerService.getDataFromJson(section).subscribe((data) => {
      this.jsonData[section] = data;
    });
  }

  // clearData(section) {
  //   this.jsonData[section] = [];
  // }

  clearData() {
    this.dataArray.splice(0, this.dataArray.length);
    this.dataArray = [];
    this.lengthCount = this.dataArray.length;
    let adminId = this.adminId;
    let obj = {
      notifications: [],
    };
    this.http
      .patch(
        "http://localhost:8443/admin/notification/deleteAllNotifications" +
        "/" +
        this.adminId,
        obj
      )
      .subscribe((data: any) => { });
  }
  onSubmit() {
    this.router.navigate(["/pages/search"]);
  }

  Logout() {
    if (this.user_type == "admin") {
      this.router.navigate(["/login/adminlogin"]);
      this.adminAuthenticationService.logout();
    } else if (this.user_type == "employee") {
      this.router.navigate(["/login/employeelogin"]);
      this.authenticationService.logout();
    } else if (this.user_type == "affiliate") {
      this.router.navigate(["/login/affiliatelogin"]);
      this.affilateAuthenticationService.logout();
    } else if (this.user_type == "client") {
      this.router.navigate(["/login/clientlogin"]);
      this.clientAuthenticationService.logout();
    } else if (this.user_type == "mainadmin") {
      this.router.navigate(["/login/adminhrlogin"]);
      this.mainAdminAuthenticationService.logout();
    } else if (this.user_type == "subadmin") {
      this.router.navigate(["/login/subadminlogin"]);
      this.subAdminAuthenticationService.logout();
    }
  }
}

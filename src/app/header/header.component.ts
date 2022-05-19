import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminAuthenticationService } from "../core/storage/authentication-admin.service";
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
  employee: boolean;
  dataArray: any;
  lengthCount: any;
  newData: any;
  newStatus= true;
  constructor(
    private headerService: HeaderService,
    private router: Router,
    private adminAuthenticationService: AdminAuthenticationService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");

    this.companyName = sessionStorage.getItem("companyName");
    this.companyLogo = `http://localhost:8443/${sessionStorage.getItem(
      "clogo"
    )}`;
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );
    this.flag = `https://assets.ipstack.com/flags/${this.current_location.country_code.toLowerCase()}.svg`;
  }

  getNotifications() {
    this.http
      .get(
        "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.employee = data[0].notification.employee;

        this.getLeaveNotifications();
      });
  }

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
  getLeaveNotifications() {
    if (this.user_type == "admin") {
      if (this.employee == true) {
        this.http
          .get(
            "http://localhost:8443/employee/leaves/getNotification" +
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
  }

  ngOnInit() {
    this.getNotifications();

    console.log(JSON.parse(sessionStorage.getItem("current_location")));

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
        "http://localhost:8443/employee/leaves/deleteLeaveNotifications" +
          "/" +
          this.adminId,
        obj
      )
      .subscribe((data: any) => {
      });
  }
  onSubmit() {
    this.router.navigate(["/pages/search"]);
  }

  Logout() {
    this.adminAuthenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

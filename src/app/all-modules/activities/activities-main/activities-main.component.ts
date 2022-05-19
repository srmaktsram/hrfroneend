import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-activities-main",
  templateUrl: "./activities-main.component.html",
  styleUrls: ["./activities-main.component.css"],
})
export class ActivitiesMainComponent implements OnInit {
  public employeeId = sessionStorage.getItem("employeeId");

  public adminId = sessionStorage.getItem("adminId");
  user_type: string;
  check: boolean;

  EmpName: any;
  dateAndTime: any;
  dtTrigger: any;
  dataArray: any;
  employee: boolean;

  constructor(
    private http: HttpClient,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");
    this.employeeId = sessionStorage.getItem("employeeId");
    if (this.user_type == "admin") {
      this.check = true;
    }
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
  //         });
  //     }
  //   }
  // }

  getLeaveNotifications(){
    if (this.user_type == "admin") {
      if (this.employee == true) {
    this.http.get("http://localhost:8443/employee/leaves/getNotification" +
            "/" +
            this.adminId
        )
        .subscribe((data: any) => {
          this.dataArray = data[0].notifications
        })
      }}
      }
  

  ngOnInit() {
    this.getNotifications();
  }
  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
}

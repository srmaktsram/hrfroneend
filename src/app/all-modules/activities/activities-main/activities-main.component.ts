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
  leaves: boolean;

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
  ///////////////
  getAllNotifications(){
    if (this.user_type == "admin") {


    this.http.get("http://localhost:8443/admin/notifications/getAllNotification" +
            "/" +
            this.adminId
        )
        .subscribe((data: any) => {
          this.dataArray = data[0].notifications
          console.log( this.dataArray," get notification for Activity Page")
        })
      }
      }
  

  ngOnInit() {
    this.getAllNotifications();
  }
  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
}

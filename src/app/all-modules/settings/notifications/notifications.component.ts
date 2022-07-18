import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  editNotification: any;
  public adminId = sessionStorage.getItem("adminId");
  employee: any;
  notificationDetails: any;
  holiday: any;
  leaves: any;
  events: any;
  jobs: any;
  chat: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getNotifications();
  }
  editNotifications(key, val) {
    let data = val.target.checked;
    this.http
      .patch(
        "http://localhost:8443/admin/notificationSetting/updateNotificationSetting" +
          "/" +
          this.adminId,
        { key, data }
      )
      .subscribe((data: any) => {
        this.getNotifications();
      });
    this._snackBar.open("Notifications updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /////
  getNotifications() {
    this.http
      .get(
        "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.employee = data[0].notification.employee;
        this.holiday = data[0].notification.holidays;
        this.leaves = data[0].notification.leaves;
        this.events = data[0].notification.events;
        this.chat = data[0].notification.chat;
        this.jobs = data[0].notification.jobs;
      });
  }
}

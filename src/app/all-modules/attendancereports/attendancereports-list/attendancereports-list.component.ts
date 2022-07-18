import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: "app-attendancereports-list",
  templateUrl: "./attendancereports-list.component.html",
  styleUrls: ["./attendancereports-list.component.css"],
})
export class AttendancereportsListComponent implements OnInit {
  public adminId: any;
  public url: any = "attendancereports";
  lstStudents;
  user_type: string;
  attendancewriteHr: string;
  constructor(
    private srvModuleService: AllModulesService,
    private http: HttpClient
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.attendancewriteHr = sessionStorage.getItem("attendancewriteHr");
  }

  ngOnInit() {
    // Floating Label

    if ($(".floating").length > 0) {
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass(
              "focused",
              e.type === "focus" || this.value.length > 0
            );
        })
        .trigger("blur");
    }
    this.loadStudents();
  }
  // Get Students List  Api Call
  loadStudents() {
    this.http
      .get(
        "http://localhost:8443/admin/attendance/getAllAttendance" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.lstStudents = data;
        console.log(this.lstStudents);
      });
  }
}

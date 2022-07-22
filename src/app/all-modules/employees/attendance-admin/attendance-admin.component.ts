import { getLocaleDateFormat } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-attendance-admin",
  templateUrl: "./attendance-admin.component.html",
  styleUrls: ["./attendance-admin.component.css"],
})
export class AttendanceAdminComponent implements OnInit {
  public monthlyPunch: any;
  public currentDate: any;
  public employeeData = [];
  public attenArry = [];
  public adminId: any;
  public rows = [];
  public srch = [];
  public day: any;
  public month: any;
  public monthlyPunchData: any;
  lstAttandance: any;
  public pipe = new DatePipe("en-US");
  lstPunch: any;
  public todayDate = new Date();
  user_type: string;
  employeewrite: string;
  employeewriteSub: string;
  createDateOfMonth: any;


  constructor(private http: HttpClient, private router: Router) {
    this.user_type = sessionStorage.getItem("user_type");
    this.employeewrite = sessionStorage.getItem("employeewrite");
    this.employeewriteSub = sessionStorage.getItem("employeewriteSub");

    this.adminId = sessionStorage.getItem("adminId");
    this.daysInMonth();
  }

  ngOnInit() {
    this.getData();
  }

  attendances: any = [];
  getData() {
    this.http
      .get(
        "http://localhost:8443/admin/monthlyAttandance/getData" +
        "/" +
        this.adminId
      )
      .subscribe((res: any) => {
        this.lstAttandance = res;
        this.lstAttandance.map((item) => {
          this.createDateOfMonth = item.createDate.split('-')

          var arr = [];
          for (let i = 0; i < this.day; i++) {
            arr.push("A");
          }
          item.monthlyPunchData.map((data) => {
            var dateDay = data.date.split("-");
            var noDay = Number(dateDay[0]);
            var noMonth = Number(dateDay[1]);

            if (noDay < this.day && noMonth === this.month) {
              if (data.status === 0) {
                arr[noDay - 1] = "A";
              } else if (data.status === 1) {
                arr[noDay - 1] = "P/2";
              } else if (data.status === 3) {
                arr[noDay - 1] = "P";
              }
            }
          });
          var obj = {
            employeeName: item.employeeName,
            attendDate: arr,
            employeeid: item.employeeid,
            profileImage: item.profileImage,
            createDateOfMonth: this.createDateOfMonth[1],
            createDateOfYear: this.createDateOfMonth[2]
          };

          this.employeeData.push(obj);
          this.rows = this.employeeData
          this.srch = [...this.rows]

        });


      });
  }

  daysInMonth() {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    this.month = month;

    var year = dt.getFullYear();
    var dayInMonth = new Date(year, month, 0).getDate();
    this.day = dayInMonth;

    return dayInMonth;
  }

  getId(id) {
    sessionStorage.setItem("empid", id);
    this.router.navigate(["/layout/employees/employeeprofile"]);
  }

  //search by name////////////////////////////////////////////////

  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  searchByMonth(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.createDateOfMonth.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  searchByYear(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.createDateOfYear.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

}
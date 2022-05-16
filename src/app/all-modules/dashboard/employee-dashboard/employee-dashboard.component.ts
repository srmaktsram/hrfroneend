import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-employee-dashboard",
  templateUrl: "./employee-dashboard.component.html",
  styleUrls: ["./employee-dashboard.component.css"],
})
export class EmployeeDashboardComponent implements OnInit {
  public adminId = sessionStorage.getItem("adminId");
  public employeeId = sessionStorage.getItem("employeeId");
  public employeeid = sessionStorage.getItem("employee_login_id");

  lstEmployee: Object;
  status: boolean;
  lstHolidays: any;
  lstHoliday: any;
  empJoin: any;
  public newData:number =0;
  lstLeave: Object;
  newStatus: boolean;
  getStatus: boolean;
  lsttommorowLeaves: any;
  lstNextSevenLeave: any;
  statusNew: boolean;
  projects: any;
  newLength: any;
  lstTasks: any;
  tasklengths: any;
  totalTaskLengths: any;
  pendingTaskLengths: any;
  allLeaveType: any;
  data: any;
  remainingDays: any;
  sickLeave: any;
  casualLeave: any;
  annualLeaves: any;
  leavesTaken: any;
  empLeaves: any;
  newLeaves: any;

  constructor(private http: HttpClient, private router: Router) {
    // alert(sessionStorage.getItem("username"));
  }
  ngOnInit() {
    this.getLeaveType()
    this.Leaves();
    this.loadNextSevenDaysLeave();
    this.getProjects();
    this.getProject();
    this.loadEmployee();
    this.getData();
    this.loadholidays();
    this.loadJoinDate();
    this.loadLeaves();
    this.loadLeave();
  }
  myDate = new Date();
  //   newChange(){
  //     this.router.navigate(['/layout/employees/employeeleaves']);
  // }

  loadEmployee() {
    this.http
      .get(
        "http://localhost:8443/admin/allEmployees/getOneEmployee" +
          "/" +
          this.adminId +
          "/" +
          this.employeeId
      )
      .subscribe((data: any) => {
        this.lstEmployee = data;
      });
  }

  loadholidays() {
    this.http
      .get("http://localhost:8443/admin/holidays/getHoliday")
      .subscribe((res: any) => {
        this.lstHolidays = res.weekData;
        this.lstHoliday = res.upcomingData;
      });
  }
  getData() {
    this.http
      .get(
        "http://localhost:8443/employee/attendance/getOneAttendance" +
          "/" +
          this.employeeid
      )
      .subscribe((data: any) => {
        if (data == null) {
          this.status = false;
        } else if (data.punch.length > 0) {
          this.status = true;
        }
      });
  }
  ///////
  loadJoinDate() {
    this.http
      .get(
        "http://localhost:8443/admin/allEmployees/getJoinDate" +
          "/" +
          this.adminId +
          "/" +
          this.employeeId
      )
      .subscribe((res: any) => {
        this.empJoin = res;
      });
  }
  /////
  loadLeaves() {
    this.http
      .get(
        "http://localhost:8443/employee/leaves/getleavesForEmpDashboard" +
          "/" +
          this.employeeId
      )
      .subscribe((data: any) => {
        if (data == null) {
          this.newStatus = false;
        } else if (data.length > 0) {
          this.newStatus = true;
        }
      });
  }
  Leaves() {
    this.http
      .get(
        "http://localhost:8443/employee/leaves/getleaves" +
          "/" +
          this.employeeId
      )
      .subscribe((data: any) => {
        this.empLeaves = data;
        this.empLeaves.map((item: any) => {
          if (item.leaveType == "Sick Leaves" || item.leaveType =="Casual Leaves") {
            this.newData = this.newData + item.noofDays;
            this.leavesTaken = this.newData;
            this.remainingDays=this.annualLeaves-this.leavesTaken

          }
        });
      });
  }
  getLeaveType() {
    this.http
      .get(
        "http://localhost:8443/admin/leaveType/getLeaveType" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.allLeaveType = data;

        this.allLeaveType.map((item: any) => {
          if (item.leaveType == "Sick Leaves") {
            this.sickLeave = item.leaveDays;
          } else if (item.leaveType == "Casual Leaves") {
            this.casualLeave = item.leaveDays;
          }
          this.annualLeaves = this.sickLeave + this.casualLeave;

        });
      });
  }

  ///////
  loadLeave() {
    this.http
      .get(
        "http://localhost:8443/admin/leaves/searchleavesForEmpDashboard" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.lsttommorowLeaves = data;

        if (data == null) {
          this.getStatus = false;
        } else if (data.length > 0) {
          this.getStatus = true;
        }
      });
  }
  loadNextSevenDaysLeave() {
    this.http
      .get(
        "http://localhost:8443/admin/leaves/searchleavesNextSevenDays" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.lstNextSevenLeave = data;
        if (data == null) {
          this.statusNew = false;
        } else if (data.length > 0) {
          this.statusNew = true;
        }
      });
  }

  getProjects() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminproject" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.projects = data;
        this.newLength = this.projects.length;
      });
  }
  //////
  getProject() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminProjects" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.lstTasks = data;
        this.totalTaskLengths = this.lstTasks.totalTask;
        this.pendingTaskLengths = this.lstTasks.pendingTask;
      });
  }
}

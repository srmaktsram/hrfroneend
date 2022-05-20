import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-leaves-employee",
  templateUrl: "./leaves-employee.component.html",
  styleUrls: ["./leaves-employee.component.css"],
})
export class LeavesEmployeeComponent implements OnInit {
  lstLeave: any;
  url: any = "employeeleaves";
  public tempId: any;
  public editId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  // public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editFromDate: any;
  public editToDate: any;
  public adminId = sessionStorage.getItem("adminId");
  public user_type = sessionStorage.getItem("user_type");

  public employeeId = sessionStorage.getItem("employeeId");
  public employeeid = sessionStorage.getItem("employee_login_id");

  allLeaveType: any;
  annualLeaves: any;
  sickLeave: any;
  casualLeave: any;
  otherLeaves: any;
  empLeaves: any;

  leavesTaken: any;
  addLeaveEmployeeForm: FormGroup;
  editLeaveEmployeeForm: FormGroup;
  remainingLeave: number;
  leaves: boolean;
  holiday: boolean;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}
  getLeaveType() {
    let nullData = 0;
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
          } else if (
            item.LeaveType != "Sick Leaves" ||
            item.LeaveType != "Casual Leaves"
          ) {
            nullData = nullData + item.leaveDays;
            this.otherLeaves = nullData;
          }
          this.annualLeaves = this.sickLeave + this.casualLeave;
        });
      });
  }

  ngOnInit() {
    this.getLeaveType();
    this.getNotifications();
    this.loadLeaves();
    this.addLeaveEmployeeForm = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: [""],
      LeaveReason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveEmployeeForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: [""],
      LeaveReason: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get leave  Api Call
  loadLeaves() {
    let newData = 0;
    this.http
      .get(
        "http://localhost:8443/employee/leaves/getleaves" +
          "/" +
          this.employeeId +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.lstLeave = data;
        this.rows = this.lstLeave;
        this.srch = [...this.rows];
        this.empLeaves = data;
        this.empLeaves.map((item: any) => {
          if (
            item.leaveType == "Sick Leaves" ||
            item.leaveType == "Casual Leaves"
          ) {
            if (item.status == "Approved") {
              newData = newData + item.noofDays;
              this.leavesTaken = newData;
              this.remainingLeave = this.annualLeaves - this.leavesTaken;
            }
          }
        });
      });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ////
  getNotifications() {
    this.http
      .get(
        "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.leaves = data[0].notification.leaves;
      });
  }
  // Add leaves for admin Modal Api Call
  addleaves() {
    if (this.addLeaveEmployeeForm.invalid) {
      this.markFormGroupTouched(this.addLeaveEmployeeForm);
      return;
    }
    if (this.addLeaveEmployeeForm.valid) {
      let fromDate = this.pipe.transform(
        this.addLeaveEmployeeForm.value.From,
        "dd-MM-yyyy"
      );
      let toDate = this.pipe.transform(
        this.addLeaveEmployeeForm.value.To,
        "dd-MM-yyyy"
      );
      let employeeId = this.employeeId;
      let obj = {
        employeeName: sessionStorage.getItem("firstName"),
        designation: "web developer",
        leaveType: this.addLeaveEmployeeForm.value.addLeaveType,
        from: fromDate,
        to: toDate,
        noofDays: this.addLeaveEmployeeForm.value.NoOfDays,
        remainleaves: this.addLeaveEmployeeForm.value.RemainLeaves,
        reason: this.addLeaveEmployeeForm.value.LeaveReason,
        status: "New",
        employeeId: this.employeeId,
        adminId: this.adminId,
        employeeid: this.employeeid,
      };

      this.http
        .post("http://localhost:8443/employee/leaves/add_leave", obj)
        .subscribe((data: any) => {
          this.loadLeaves();

          let document = data;
          let message = "applied for ";
          let author = document.employeeName;
          let functions = document.leaveType;
          let time = document.createDate;
            if (this.leaves == true) {

              this.http
                .post(
                  "http://localhost:8443/admin/allNotification/createNotification" +
                    "/" +
                    this.adminId,
                  { message, author, functions, time }
                )
                .subscribe((data: any) => {
                  this.loadLeaves();
                });
            }
          
        });

      // this.loadLeaves();
      $("#add_leave").modal("hide");
      this.addLeaveEmployeeForm.reset();
      this.toastr.success("Leaves added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLeaveEmployeeForm.valid) {
      let id = this.editId;
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.editLeaveEmployeeForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveEmployeeForm.value.NoOfDays,
        remainleaves: this.editLeaveEmployeeForm.value.RemainLeaves,
        reason: this.editLeaveEmployeeForm.value.LeaveReason,
      };
      this.http
        .patch(
          "http://localhost:8443/employee/leaves/updateLeave" + "/" + id,
          obj
        )
        .subscribe((data) => {
          this.loadLeaves();
        });

      $("#edit_leave").modal("hide");
      this.toastr.success("Leaves Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Delete leaves Modal Api Call

  deleteleaves() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/employee/leaves/deleteLeave" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.loadLeaves();
        $("#delete_approve").modal("hide");
        this.toastr.success("Leaves deleted sucessfully..!", "Success");
      });
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstLeave.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstLeave[index];
    this.editLeaveEmployeeForm.patchValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: this.remainingLeave,
      LeaveReason: toSetValues.reason,
    });
  }

  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
}

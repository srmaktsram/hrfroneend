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
export class LeavesEmployeeComponent implements OnInit, OnDestroy {
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
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  public adminId = sessionStorage.getItem("adminId");
  public employeeId = sessionStorage.getItem("employeeId");
  allLeaveType: any;
  annualLeaves: any;
  sickLeave: any;
  casualLeave: any;
  otherLeaves: any;
  empLeaves: any;
  public newData:number =0;
  public nullData:number =0;
  remainingDays: number;
  leavesTaken: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}
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
         else if (item.LeaveType != "Sick Leaves" || item.LeaveType != "Casual Leaves") {
            this.nullData=this.nullData+item.leaveDays;
            this.otherLeaves = this.nullData

          }
          this.annualLeaves = this.sickLeave + this.casualLeave;
        });
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
          if (
            item.leaveType == "Sick Leaves" ||
            item.leaveType == "Casual Leaves"
          ) {
            this.newData = this.newData + item.noofDays;
            this.leavesTaken = this.newData;
            this.remainingDays = this.annualLeaves - this.leavesTaken;
          }
        });
      });
  }

  ngOnInit() {
    this.loadLeaves();
    this.getLeaveType();
    this.Leaves()

    this.addLeaveadminForm = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
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
    this.http
      .get(
        "http://localhost:8443/employee/leaves/getleaves" +
          "/" +
          this.employeeId
      )
      .subscribe((data) => {
        this.lstLeave = data;
        this.rows = this.lstLeave;
        this.srch = [...this.rows];
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
  // Add leaves for admin Modal Api Call
  addleaves() {
    if (this.addLeaveadminForm.invalid) {
      this.markFormGroupTouched(this.addLeaveadminForm);
      return;
    }
    if (this.addLeaveadminForm.valid) {
      let fromDate = this.pipe.transform(
        this.addLeaveadminForm.value.From,
        "dd-MM-yyyy"
      );
      let toDate = this.pipe.transform(
        this.addLeaveadminForm.value.To,
        "dd-MM-yyyy"
      );
      let employeeId = this.employeeId;
      let obj = {
        employeeName: sessionStorage.getItem("firstName"),
        designation: "web developer",
        leaveType: this.addLeaveadminForm.value.addLeaveType,
        from: fromDate,
        to: toDate,
        noofDays: this.addLeaveadminForm.value.NoOfDays,
        remainleaves: this.addLeaveadminForm.value.RemainLeaves,
        reason: this.addLeaveadminForm.value.LeaveReason,
        status: "New",
        employeeId: this.employeeId,
      };

      this.http
        .post("http://localhost:8443/employee/leaves/add_leave", obj)
        .subscribe((data) => {
         

          this.loadLeaves();
        });

      // this.loadLeaves();
      $("#add_leave").modal("hide");
      this.addLeaveadminForm.reset();
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
    if (this.editLeaveadminForm.valid) {
      let id = this.editId;
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.editLeaveadminForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveadminForm.value.NoOfDays,
        remainleaves: this.editLeaveadminForm.value.RemainLeaves,
        reason: this.editLeaveadminForm.value.LeaveReason,
      };
      this.http
        .patch(
          "http://localhost:8443/employee/leaves/updateLeave" + "/" + id,
          obj
        )
        .subscribe((data) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.loadLeaves();
          });
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
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
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
    this.editLeaveadminForm.setValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: toSetValues.remainleaves,
      LeaveReason: toSetValues.reason,
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

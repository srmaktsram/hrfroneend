import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-leaves-admin",
  templateUrl: "./leaves-admin.component.html",
  styleUrls: ["./leaves-admin.component.css"],
})
export class LeavesAdminComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public lstLeave: any;
  public url: any = "adminleaves";
  public tempId: any;
  public lstEmployee: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public statusValue;

  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  adminId: any;
  public id: any;
  router: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private http: HttpClient,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.loadLeaves();

    this.getAllEmployeeData();

    this.addLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.lstLeave = [];
    this.loadLeaves();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Get leave  Api Call
  loadLeaves() {
    this.http
      .get(
        "http://localhost:8443/admin/leaves/searchleaves" + "/" + this.adminId
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
      let obj = {
        // designation: "web developer",
        leaveType: this.addLeaveadminForm.value.LeaveType,
        from: fromDate,
        to: toDate,
        noofDays: this.addLeaveadminForm.value.NoOfDays,
        remainleaves: this.addLeaveadminForm.value.RemainLeaves,
        reason: this.addLeaveadminForm.value.LeaveReason,
        status: "Approved",
      };
      console.log("obj", obj);
      this.http
        .post("http://localhost:8443/admin/leaves/createLeave", obj)
        .subscribe((res) => {
          console.log("postApi", res);
          this.loadLeaves();
          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });

      $("#add_leave").modal("hide");
      this.addLeaveadminForm.reset();
      // this.toastr.success("Leaves added sucessfully...!", "Success");
      this._snackBar.open("Leaves added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      // this.toastr.warning("Mandatory fields required", "");
      this._snackBar.open("Mandatory fields required !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // to know the date picker changes

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    this.id = this.editId;
    if (this.editLeaveadminForm.valid) {
      let obj = {
        // employeeName: "Mike Litorus",
        // designation: "web developer",
        leaveType: this.editLeaveadminForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveadminForm.value.NoOfDays,
        remainleaves: this.editLeaveadminForm.value.RemainLeaves,
        reason: this.editLeaveadminForm.value.LeaveReason,
        // status: "Approved",
      };
      this.http
        .patch(
          "http://localhost:8443/admin/leaves/updateAdminLeave" + "/" + this.id,
          obj
        )
        .subscribe((res) => {
          console.log("updateApi", res);
          this.loadLeaves();
          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });

      $("#edit_leave").modal("hide");
      // this.toastr.success("Leaves Updated sucessfully...!", "Success");
      this._snackBar.open("Leaves Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
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
      .patch("http://localhost:8443/admin/leaves/deleteLeave" + "/" + id, obj)
      .subscribe((data) => {
        console.log("deleteApi", data);
        this.loadLeaves();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    $("#delete_approve").modal("hide");
    // this.toastr.success("Leaves deleted sucessfully..!", "Success");
    this._snackBar.open("Leaves deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
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

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchType(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.leaveType.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.from.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchByTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.to.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAllEmployeeData() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        console.log("getAllEmployee", data);
        this.lstEmployee = data;
        this.rows = this.lstEmployee;
        this.srch = [...this.rows];
      });
  }

  getId(id) {
    console.log("bbbbbbb", id);
    sessionStorage.setItem("empid", id);
    this.router.navigate(["/layout/employees/employeeprofile"]);
  }

  updateStatus(val, id) {
    this.http
      .patch("http://localhost:8443/admin/leaves/updateAdminLeave" + "/" + id, {
        status: val,
      })
      .subscribe((data: any) => {
        console.log(data, "updateStatus");
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        this.loadLeaves();
        // });
      });
  }
}

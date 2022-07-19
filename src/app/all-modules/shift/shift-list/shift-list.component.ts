import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-shift-list",
  templateUrl: "./shift-list.component.html",
  styleUrls: ["./shift-list.component.css"],
})
export class ShiftListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public url: any = "shiftlist";
  public tempId: any;
  public adminId = sessionStorage.getItem("adminId");
  public editId: any;
  public addRevenueForm: FormGroup;
  public editRevenueForm: FormGroup;
  public lstRevenue;
  public editedvalue;
  public rows = [];
  public srch = [];
  user_type: string;
  employeewrite: string;
  employeewriteSub: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
        private _snackBar: MatSnackBar

  ) { 
    this.user_type = sessionStorage.getItem("user_type");
    this.employeewrite = sessionStorage.getItem("employeewrite");
    this.employeewriteSub = sessionStorage.getItem("employeewriteSub");
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
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadRevenue();
    this.addRevenueForm = this.formBuilder.group({
      ShiftName: ["", [Validators.required]],
      MinStartTime: ["", [Validators.required]],
      StartTime: ["", [Validators.required]],
      MaxStartTime: ["", [Validators.required]],
      MinEndTime: ["", [Validators.required]],
      EndTime: ["", [Validators.required]],
      MaxEndTime: ["", [Validators.required]],
      BreakTime: ["", [Validators.required]],
    });
    this.editRevenueForm = this.formBuilder.group({
      ShiftName: ["", [Validators.required]],
      MinStartTime: ["", [Validators.required]],
      StartTime: ["", [Validators.required]],
      MaxStartTime: ["", [Validators.required]],
      MinEndTime: ["", [Validators.required]],
      EndTime: ["", [Validators.required]],
      MaxEndTime: ["", [Validators.required]],
      BreakTime: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadRevenue() {
    this.http
      .get("http://localhost:8443/admin/shifts/getShifts" + "/" + this.adminId)
      .subscribe((res: any) => {
        console.log("getApi", res);
        this.lstRevenue = res;
        this.dtTrigger.next();
        this.rows = this.lstRevenue;
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

  // Add Department  Modal Api Call
  addRevenue() {
    if (this.addRevenueForm.invalid) {
      this.markFormGroupTouched(this.addRevenueForm);
      return;
    }
    if (this.addRevenueForm.valid) {
      let obj = {
        shiftName: this.addRevenueForm.value.ShiftName,
        minStartTime: this.addRevenueForm.value.MinStartTime,
        startTime: this.addRevenueForm.value.StartTime,
        maxStartTime: this.addRevenueForm.value.MaxStartTime,
        minEndTime: this.addRevenueForm.value.MinEndTime,
        endTime: this.addRevenueForm.value.EndTime,
        maxEndTime: this.addRevenueForm.value.MaxEndTime,
        breakTime: this.addRevenueForm.value.BreakTime,
        adminId: this.adminId,
        // id: 0,
        // status: "Active"
      };
      this.http
        .post("http://localhost:8443/admin/shifts/createShift", obj)
        .subscribe((res) => {
          console.log("postApi", res);
          this.LoadRevenue();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });

      $("#add_shift").modal("hide");
      this.addRevenueForm.reset();
      this._snackBar.open("Shift-list added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editRevenue() {
    if (this.editRevenueForm.valid) {
      let id = this.editId;
      let obj = {
        shiftName: this.editRevenueForm.value.ShiftName,
        minStartTime: this.editRevenueForm.value.MinStartTime,
        startTime: this.editRevenueForm.value.StartTime,
        maxStartTime: this.editRevenueForm.value.MaxStartTime,
        minEndTime: this.editRevenueForm.value.MinEndTime,
        endTime: this.editRevenueForm.value.EndTime,
        maxEndTime: this.editRevenueForm.value.MaxEndTime,
        breakTime: this.editRevenueForm.value.BreakTime,

        // status: "Active"
      };
      this.http
        .patch("http://localhost:8443/admin/shifts/updateShift" + "/" + id, obj)
        .subscribe((res) => {
          console.log("updateApi", res);
          this.LoadRevenue();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });

      $("#edit_shift").modal("hide");
      this._snackBar.open("Budget-list Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editedvalue = value.ShiftName;
    this.editId = value.id;
    const index = this.lstRevenue.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstRevenue[index];
    this.editRevenueForm.setValue({
      ShiftName: toSetValues.shiftName,
      MinStartTime: toSetValues.minStartTime,
      StartTime: toSetValues.startTime,
      MaxStartTime: toSetValues.maxStartTime,
      MinEndTime: toSetValues.minEndTime,
      EndTime: toSetValues.endTime,
      MaxEndTime: toSetValues.maxEndTime,
      BreakTime: toSetValues.breakTime,
    });
  }

  deleteRevenue() {
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/shifts/deleteShift" + "/" + this.tempId,
        obj
      )
      .subscribe((res) => {
        console.log("deliteApi", res);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadRevenue();
        $("#delete_employee").modal("hide");
        this._snackBar.open("Budget-revenue deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

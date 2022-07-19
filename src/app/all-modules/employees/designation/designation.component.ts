import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstDesignation: any;
  url: any = "designation";
  public tempId: any;
  public editId: any;
  public dropdownData: any;
  public adminId = sessionStorage.getItem("adminId");

  public rows = [];
  public srch = [];
  public addDesignationForm: FormGroup;
  public editDesignationForm: FormGroup;
  user_type: string;
  employeewrite: string;
  employeewriteSub: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.employeewrite = sessionStorage.getItem("employeewrite");
    this.employeewriteSub = sessionStorage.getItem("employeewriteSub");
    this.getDepartmentData();
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadDesignation();

    this.addDesignationForm = this.formBuilder.group({
      Designation: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      DepartmentName: ["", [Validators.required]],
    });

    this.editDesignationForm = this.formBuilder.group({
      Designation: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      DepartmentName: ["", [Validators.required]],
    });
  }

  // Get designation list  Api Call
  LoadDesignation() {
    this.http
      .get(
        "http://localhost:8443/admin/designation/getData" + "/" + this.adminId
      )
      .subscribe((data) => {
        //console.log("getapi", data)
        this.lstDesignation = data;
        this.dtTrigger.next();

        this.rows = this.lstDesignation;
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

  // Add Designation  Modal Api Call
  addDesignation() {
    if (this.addDesignationForm.invalid) {
      this.markFormGroupTouched(this.addDesignationForm);
      return;
    }
    if (this.addDesignationForm.valid) {
      let adminId = sessionStorage.getItem("adminId");
      let obj = {
        designation: this.addDesignationForm.value.Designation,
        departmentName: this.addDesignationForm.value.DepartmentName,
        id: 1,
        adminId: adminId,
      };
      this.http
        .post("http://localhost:8443/admin/designation/create", obj)
        .subscribe((res: any) => {
          this.LoadDesignation();
        });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });

      $("#add_designation").modal("hide");
      this.addDesignationForm.reset();
      // this.toastr.success("Desigantion added sucessfully...!", "Success");
      this._snackBar.open("Desigantion added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editDesignation() {
    let designationId = this.editId;
    if (this.editDesignationForm.valid) {
      let obj = {
        designation: this.editDesignationForm.value.Designation,
        departmentName: this.editDesignationForm.value.DepartmentName,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/designation/update" +
            "/" +
            designationId,
          obj
        )
        .subscribe((data1) => {
          //console.log("patchapi", data1)
          this.LoadDesignation();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });

      $("#edit_designation").modal("hide");
      // this.toastr.success("Department Updated sucessfully...!", "Success");
      this._snackBar.open("Department Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstDesignation.findIndex((item) => {
      return item.designationId === value;
    });
    let toSetValues = this.lstDesignation[index];
    //console.log(toSetValues)
    this.editDesignationForm.setValue({
      Designation: toSetValues.designation,
      DepartmentName: toSetValues.departmentName,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteDesignation() {
    let designationId = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/designation/delete" + "/" + designationId,
        obj
      )
      .subscribe((data1) => {
        this.LoadDesignation();
        //console.log("deleteApi", data1)
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });

        $("#delete_designation").modal("hide");
        // this.toastr.success("Designation deleted sucessfully..!", "Success");
        this._snackBar.open("Designation deleted sucessfully !", "", {
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

  getDepartmentData() {
    this.http
      .get(
        "http://localhost:8443/admin/department/getAdminData" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        console.log("DropdownData", data);

        this.dropdownData = data;

        //console.log("data==>>", this.dropdownData);
      });
  }
}

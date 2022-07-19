import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { query } from "@angular/animations";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstDepartment: any;
  public url: any = "departments";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public addDepartmentForm: FormGroup;
  public editDepartmentForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");

  DepartmentName: any;
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
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadDepartment();

    this.addDepartmentForm = this.formBuilder.group({
      DepartmentName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
    });

    this.editDepartmentForm = this.formBuilder.group({
      DepartmentName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
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

  // Get department list  Api Call
  LoadDepartment() {
    this.http
      .get(
        "http://localhost:8443/admin/department/getAdminData" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.lstDepartment = data;
        this.dtTrigger.next();
        this.rows = this.lstDepartment;
        this.srch = [...this.rows];

        //console.log("resultquery", data);
      });
  }

  // Add Department  Modal Api Call
  addDepartment() {
    if (this.addDepartmentForm.invalid) {
      this.markFormGroupTouched(this.addDepartmentForm);
      return;
    }
    let adminId = sessionStorage.getItem("adminId");
    if (this.addDepartmentForm.valid) {
      let obj = {
        departmentName: this.addDepartmentForm.value.DepartmentName,
        adminId: adminId,
      };

      this.http
        .post("http://localhost:8443/admin/department/create", obj)
        .subscribe((res: any) => {
          this.LoadDepartment();
        });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });

      $("#add_department").modal("hide");
      //this.addDepartmentForm.reset();
      // this.toastr.success("Department added sucessfully...!", "Success");
      this._snackBar.open("Department added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editDepartment() {
    let departmentId = this.editId;

    if (this.editDepartmentForm.valid) {
      let obj = {
        departmentName: this.editDepartmentForm.value.DepartmentName,
      };

      this.http
        .patch(
          "http://localhost:8443/admin/department/update" + "/" + departmentId,
          obj
        )
        .subscribe((data1) => {
          this.LoadDepartment();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          //console.log("data update result", data1)
        });

      $("#edit_department").modal("hide");
      // this.toastr.success("Department Updated sucessfully...!", "Success");
      this._snackBar.open("Department Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    // alert(value)
    const index = this.lstDepartment.findIndex((item) => {
      return item.departmentId === value;
    });
    let toSetValues = this.lstDepartment[index];
    //console.log(toSetValues)
    this.editDepartmentForm.setValue({
      DepartmentName: toSetValues.departmentName,
    });
  }

  deleteDepartment() {
    let deparmentId = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/department/delete" + "/" + deparmentId,
        obj
      )
      .subscribe((data1) => {
        this.LoadDepartment();
        //console.log("deleteApi", data1)
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });

        $("#delete_department").modal("hide");
        // this.toastr.success("Department deleted sucessfully..!", "Success");
        this._snackBar.open("Department deleted sucessfully !", "", {
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

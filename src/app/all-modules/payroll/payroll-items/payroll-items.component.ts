import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";
import { id } from "src/assets/all-modules-data/id";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;

@Component({
  selector: "app-payroll-items",
  templateUrl: "./payroll-items.component.html",
  styleUrls: ["./payroll-items.component.css"],
})
export class PayrollItemsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  // dtOptions: DataTables.Settings = {};
  public urlAdd: any = "payrollAddition";
  public urlOver: any = "payrollOvertime";
  public urlDeduct: any = "payrollDeduction";
  public adminId = sessionStorage.getItem("adminId");

  public allAddPayroll: any = [];
  public allOverPayroll: any = [];
  public allDeductPayroll: any = [];
  public addPayrollForm: FormGroup;
  public addOverForm: FormGroup;
  public addDeductForm: FormGroup;
  public editPayrollForm: FormGroup;
  public editOverForm: FormGroup;
  public editDeductForm: FormGroup;
  public editAddId: any;
  public editOverId: any;
  public editDeductId: any;
  public tempAddId: any;
  public tempOverId: any;
  public tempDeductId: any;
  tempId: any;
  user_type: string;
  payrollswriteHr: string;

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient

  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.payrollswriteHr = sessionStorage.getItem("payrollswriteHr");
   }


  ngOnInit() {
    //get add payroll
    this.getAddPayroll();

    //get over payroll
    this.getOverpayroll();

    //get deduct payroll
    this.getDeductPayroll();

    // Add payroll Form Validation And Getting Values

    this.addPayrollForm = this.formBuilder.group({
      addPayrollName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      addPayrollCategory: ["", [Validators.required]],
      addPayrollUnit: ["", [Validators.required]],
    });

    // Edit payroll Form Validation And Getting Values

    this.editPayrollForm = this.formBuilder.group({
      editPayrollName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      editPayrollCategory: ["", [Validators.required]],
      editPayrollUnit: ["", [Validators.required]],
    });

    // Add overTime Form Validation And Getting Values

    this.addOverForm = this.formBuilder.group({
      addOverName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      addOverRateType: ["", [Validators.required]],
      addOverRate: ["", [Validators.required]],
    });

    // Edit overtime Form Validation And Getting Values

    this.editOverForm = this.formBuilder.group({
      editOverName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      editOverRateType: ["", [Validators.required]],
      editOverRate: ["", [Validators.required]],
    });

    // Add deduction Form Validation And Getting Values

    this.addDeductForm = this.formBuilder.group({
      addDeductName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      addDeductUnit: ["", [Validators.required]],
    });

    // Edit deduction Form Validation And Getting Values

    this.editDeductForm = this.formBuilder.group({
      editDeductName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      editDeductunit: ["", [Validators.required]],
    });

    // //data table configuration
    // this.dtOptions = {
    //   // ... skipped ...
    //   dom: "lrtip",
    // };
  }

  // get payroll
  getAddPayroll() {
    this.http
      .get(
        "http://localhost:8443/admin/payrollItems/getAddition" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.allAddPayroll = data;
        $("#datatable1").DataTable().clear();
      });
  }

  // get overtime
  getOverpayroll() {
    this.http
      .get(
        "http://localhost:8443/admin/payrollItems/getOvertime" +
          "/" +
          this.adminId
      )
      .subscribe((res: any) => {
        this.allOverPayroll = res;
        $("#datatable2").DataTable().clear();
      });
  }

  // get deducts
  getDeductPayroll() {
    this.http
      .get(
        "http://localhost:8443/admin/payrollItems/getDeduction" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.allDeductPayroll = data;
        $("#datatable3").DataTable().clear();
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
  // Add payroll Modal Api Call

  addPayroll() {
    if (this.addPayrollForm.invalid) {
      this.markFormGroupTouched(this.addPayrollForm);
      return;
    }
    if (this.addPayrollForm.valid) {
      let obj = {
        name: this.addPayrollForm.value.addPayrollName,
        category: this.addPayrollForm.value.addPayrollCategory,
        unitCost: this.addPayrollForm.value.addPayrollUnit,
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/payrollItems/createAddition", obj)
        .subscribe((data1) => {});
      this.getAddPayroll();
      $("#add_addition").modal("hide");
      this.addPayrollForm.reset();
      this._snackBar.open("Payroll Added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // Edit payroll Modal Api Call

  editPayroll() {
    let id = this.editAddId;
    let obj = {
      name: this.editPayrollForm.value.editPayrollName,
      category: this.editPayrollForm.value.editPayrollCategory,
      unitCost: this.editPayrollForm.value.editPayrollUnit,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/updateAddition" + "/" + id,
        obj
      )
      .subscribe((data1) => {});
    this.getAddPayroll();
    $("#edit_addition").modal("hide");
    this._snackBar.open("Payroll updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  editAdd(value) {
    this.editAddId = value;
    const index = this.allAddPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allAddPayroll[index];
    this.editPayrollForm.setValue({
      editPayrollName: toSetValues.name,
      editPayrollCategory: toSetValues.category,
      editPayrollUnit: toSetValues.unitCost,
    });
  }

  // Delete payroll Modal Api Call

  deletePayroll() {
    let id = this.tempAddId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/deleteAddition" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getAddPayroll();
        $("#delete_addition").modal("hide");
      });
    this._snackBar.open("Payroll deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // Add overtime Modal Api Call

  addOver() {
    if (this.addOverForm.valid) {
      let obj = {
        name: this.addOverForm.value.addOverName,
        rateType: this.addOverForm.value.addOverRateType,
        rate: this.addOverForm.value.addOverRate,

        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/payrollItems/createOvertime", obj)
        .subscribe((data) => {
          this.getOverpayroll();
        });

      $("#add_overtime").modal("hide");
      this.addOverForm.reset();
      this._snackBar.open("Overtime Added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // Edit overtime Modal Api Call

  editOverSubmit() {
    let id = this.editOverId;
    let obj = {
      name: this.editOverForm.value.editOverName,
      rate: this.editOverForm.value.editOverRate,
      rateType: this.editOverForm.value.editOverRateType,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/updateOvertime" + "/" + id,
        obj
      )
      .subscribe((data1) => {
        this.getOverpayroll();
      });
    $("#edit_overtime").modal("hide");
    this._snackBar.open("Overtime updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  editOver(value) {
    this.editOverId = value;
    const index = this.allOverPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allOverPayroll[index];
    this.editOverForm.patchValue({
      editOverName: toSetValues.name,
      editOverRateType: toSetValues.rateType,
      editOverRate: toSetValues.rate,
    });
  }

  // Delete overtime Modal Api Call

  deleteOver() {
    let id = this.tempOverId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/deleteOvertime" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getOverpayroll();
        $("#delete_overtime").modal("hide");
      });
    this._snackBar.open("Overtime Deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // Add deduction Modal Api Call

  addDeducts() {
    if (this.addDeductForm.valid) {
      let obj = {
        name: this.addDeductForm.value.addDeductName,
        unitCost: this.addDeductForm.value.addDeductUnit,
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/payrollItems/createDeduction", obj)
        .subscribe((data) => {});
      this.getDeductPayroll();
      $("#add_deduction").modal("hide");
      this.addDeductForm.reset();
      this._snackBar.open("Deduction Added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // Edit deduction Modal Api Call

  editDeductSubmit() {
    let id = this.editDeductId;
    let obj = {
      name: this.editDeductForm.value.editDeductName,
      unitCost: this.editDeductForm.value.editDeductunit,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/updateDeduction" + "/" + id,
        obj
      )
      .subscribe((data1) => {});
    this.getDeductPayroll();
    $("#edit_deduction").modal("hide");
    this._snackBar.open("Deducts updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  editDeduct(value) {
    this.editDeductId = value;
    const index = this.allDeductPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allDeductPayroll[index];
    this.editDeductForm.setValue({
      editDeductName: toSetValues.name,
      editDeductunit: toSetValues.unitCost,
    });
  }

  // Delete deduction Modal Api Call

  deleteDeduct() {
    let id = this.tempDeductId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/payrollItems/deleteDeduction" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getDeductPayroll();
        $("#delete_deduction").modal("hide");
      });
    this._snackBar.open("Deduction updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

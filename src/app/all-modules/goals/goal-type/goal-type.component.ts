import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
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
  selector: "app-goal-type",
  templateUrl: "./goal-type.component.html",
  styleUrls: ["./goal-type.component.css"],
})
export class GoalTypeComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  lstGoaltype: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "goaltype";

  public dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public srch = [];

  public tempId: any;
  public editId: any;
  public addGoalTypeForm: FormGroup;
  public editGoalTypeForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");
  user_type: string;
  goalsWrite: string;
  goalsWriteSub: string;

  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.goalsWrite = sessionStorage.getItem("goalsWrite");
    this.goalsWriteSub = sessionStorage.getItem("goalsWriteSub");
    this.LoadGoaltype();
  }

  ngOnInit() {
    this.LoadGoaltype();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.addGoalTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editGoalTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
  }

  // Get  goal type  Api Call
  LoadGoaltype() {
    this.http
      .get(
        "http://localhost:8443/admin/goalType/getGoalType" + "/" + this.adminId
      )
      .subscribe((data) => {
        this.lstGoaltype = data;
        this.dtTrigger.next();
        this.rows = this.lstGoaltype;
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
  // Add  goal type  Modal Api Call
  addGoalType() {
    if (this.addGoalTypeForm.invalid) {
      this.markFormGroupTouched(this.addGoalTypeForm);
      return;
    }
    if (this.addGoalTypeForm.valid) {
      let obj = {
        type: this.addGoalTypeForm.value.GoalType,
        description: this.addGoalTypeForm.value.Description,
        status: this.addGoalTypeForm.value.Status,
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/goalType/createGoalType", obj)
        .subscribe((data) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.LoadGoaltype();

            dtInstance.destroy();
          });
        });
      $("#add_type").modal("hide");
      this.addGoalTypeForm.reset();
      this._snackBar.open("Goal type added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editGoalType() {
    if (this.editGoalTypeForm.valid) {
      let id = this.editId;
      let obj = {
        type: this.editGoalTypeForm.value.GoalType,
        description: this.editGoalTypeForm.value.Description,
        status: this.editGoalTypeForm.value.Status,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/goalType/updateGoalType" + "/" + id,
          obj
        )
        .subscribe((data1) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.LoadGoaltype();
            dtInstance.destroy();
          });
        });

      $("#edit_type").modal("hide");
      this._snackBar.open("Goal type Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstGoaltype.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstGoaltype[index];
    this.editGoalTypeForm.setValue({
      GoalType: toSetValues.type,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteGoalType() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };

    this.http
      .patch(
        "http://localhost:8443/admin/goalType/deleteGoalType" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadGoaltype();
        $("#delete_type").modal("hide");
        this._snackBar.open("Goal type deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  updateGoalTypeStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/admin/goalType/updateGoalTypeStatus" + "/" + id,
        { status }
      )
      .subscribe((data1) => {
        this.LoadGoaltype();
      });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this._snackBar.open("GoalType Status Updated  sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

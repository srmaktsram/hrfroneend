import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-goal-list",
  templateUrl: "./goal-list.component.html",
  styleUrls: ["./goal-list.component.css"],
})
export class GoalListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  lstGoal: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "goallist";

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;
  public addGoalForm: FormGroup;
  public editGoalForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");
  lstGoaltype: Object;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.LoadGoaltype();
  }
  LoadGoaltype() {
    this.http
      .get(
        "http://localhost:8443/admin/goalType/getGoalType" + "/" + this.adminId
      )
      .subscribe((data) => {
        this.lstGoaltype = data;
        this.dtTrigger.next();
        // this.rows = this.lstGoaltype;
        // this.srch = [...this.rows];
      });
  }

  ngOnInit() {
    this.LoadGoal();

    this.addGoalForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Subject: ["", [Validators.required]],
      TargetAchivement: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editGoalForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Subject: ["", [Validators.required]],
      TargetAchivement: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get goallist  Api Call
  LoadGoal() {
    this.http
      .get(
        "http://localhost:8443/admin/goalList/getGoalList" + "/" + this.adminId
      )
      .subscribe((data) => {
        this.lstGoal = data;
        this.dtTrigger.next();
        this.rows = this.lstGoal;
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
  addGoal() {
    if (this.addGoalForm.invalid) {
      this.markFormGroupTouched(this.addGoalForm);
      return;
    }
    if (this.addGoalForm.valid) {
      let StartDatetime = this.pipe.transform(
        this.addGoalForm.value.StartDate,
        "dd-MM-yyyy"
      );
      let EndDatetime = this.pipe.transform(
        this.addGoalForm.value.EndDate,
        "dd-MM-yyyy"
      );
      let obj = {
        goalType: this.addGoalForm.value.GoalType,
        subject: this.addGoalForm.value.Subject,
        targetAchivement: this.addGoalForm.value.TargetAchivement,
        startDate: StartDatetime,
        endDate: EndDatetime,
        description: this.addGoalForm.value.Description,
        status: this.addGoalForm.value.Status,
        progress: "Completed 73%",
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/goalList/createGoalList", obj)
        .subscribe((data) => {
          this.LoadGoal();

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });

      $("#add_goal").modal("hide");
      this.addGoalForm.reset();
      this._snackBar.open("Goal added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editGoal() {
    if (this.editGoalForm.valid) {
      let StartDatetime = this.pipe.transform(
        this.editGoalForm.value.StartDate,
        "dd-MM-yyyy"
      );
      let EndDatetime = this.pipe.transform(
        this.editGoalForm.value.EndDate,
        "dd-MM-yyyy"
      );
      let id = this.editId;
      let obj = {
        goalType: this.editGoalForm.value.GoalType,
        subject: this.editGoalForm.value.Subject,
        targetAchivement: this.editGoalForm.value.TargetAchivement,
        startDate: StartDatetime,
        endDate: EndDatetime,
        description: this.editGoalForm.value.Description,
        status: this.editGoalForm.value.Status,
        progress: "Completed 73%",
      };
      this.http
        .patch(
          "http://localhost:8443/admin/goalList/updateGoalList" + "/" + id,
          obj
        )
        .subscribe((data1) => {
          this.LoadGoal();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });

      $("#edit_goal").modal("hide");
      this._snackBar.open("Goal Updated sucessfully !", "", {
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
    const index = this.lstGoal.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstGoal[index];
    this.editGoalForm.setValue({
      GoalType: toSetValues.goalType,
      Subject: toSetValues.subject,
      TargetAchivement: toSetValues.targetAchivement,
      StartDate: toSetValues.startDate,
      EndDate: toSetValues.endDate,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteGoal() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/goalList/deleteGoalList" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadGoal();
        $("#delete_goal").modal("hide");
        this._snackBar.open("Goal deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  //getting the status value
  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/admin/goalList/updateGoalListStatus" + "/" + id,
        { status }
      )
      .subscribe((data1) => {
        this.LoadGoal();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

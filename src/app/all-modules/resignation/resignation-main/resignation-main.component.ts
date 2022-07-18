import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-resignation-main",
  templateUrl: "./resignation-main.component.html",
  styleUrls: ["./resignation-main.component.css"],
})
export class ResignationMainComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  lstResignation: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "resignationmain";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public adminId: any;
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addResignForm: FormGroup;
  public editResignForm: FormGroup;
  public NoticedDate;
  public ResignDate;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.loadResignation();
    this.dtOptions = {
      // ... skipped ...
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  resignation Api Call
  loadResignation() {
    this.http
      .get(
        "http://localhost:8443/admin/resignation/getAdminResignation" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        console.log("GetData>>>>>>>>>>>>>>>>>>>>>>>", data);
        this.lstResignation = data;
        this.rows = this.lstResignation;
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

  // Add Resignation  Modal Api Call
  addResignation() {
    if (this.addResignForm.invalid) {
      this.markFormGroupTouched(this.addResignForm);
      return;
    }
    if (this.addResignForm.valid) {
      let noticedDate = this.pipe.transform(
        this.addResignForm.value.NoticeDated,
        "dd-MM-yyyy"
      );
      let resignationDate = this.pipe.transform(
        this.addResignForm.value.ResignationDate,
        "dd-MM-yyyy"
      );
      let obj = {
        adminId: this.adminId,
        employee: this.addResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: noticedDate,
        resignDate: resignationDate,
        reason: this.addResignForm.value.ReasonName,
      };
      this.http
        .post("http://localhost:8443/admin/resignation/createResignation", obj)
        .subscribe((data: any) => {
          this.loadResignation();

          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });

      $("#add_resignation").modal("hide");
      this.addResignForm.reset();

      this._snackBar.open("Resignation added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // to know the date picker changes

  from(data) {
    this.NoticedDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.ResignDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  //update api call
  editResignation() {
    if (this.editResignForm.valid) {
      let obj = {
        employee: this.editResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: this.NoticedDate,
        resignDate: this.ResignDate,
        reason: this.editResignForm.value.ReasonName,
        id: this.editId,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/resignation/updateResignation" +
            "/" +
            this.editId,
          obj
        )
        .subscribe((data: any) => {
          console.log("updateData>>>>>>>>>>>>>>>", data);
          this.loadResignation();
          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });

      $("#edit_resignation").modal("hide");

      this._snackBar.open("Resignation updated sucessfully !", "", {
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
    const index = this.lstResignation.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstResignation[index];
    this.editResignForm.setValue({
      EmployeeName: toSetValues.employee,
      NoticeDated: toSetValues.noticedDate,
      ResignationDate: toSetValues.resignDate,
      ReasonName: toSetValues.reason,
    });
  }

  // delete api call
  deleteResignation() {
    alert(this.tempId);
    this.http
      .patch(
        "http://localhost:8443/admin/resignation/updateResignation" +
          "/" +
          this.tempId,
        { status: 2 }
      )
      .subscribe((data: any) => {
        console.log("deleteData>>>>>>>>>>>>>>>", data);
        this.loadResignation();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    $("#delete_resignation").modal("hide");

    this._snackBar.open("Resignation  deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

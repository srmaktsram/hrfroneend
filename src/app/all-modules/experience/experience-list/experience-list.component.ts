import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";
declare const $: any;
@Component({
  selector: "app-experience-list",
  templateUrl: "./experience-list.component.html",
  styleUrls: ["./experience-list.component.css"],
})
export class ExperienceListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "expire";
  public tempId: any;
  public editId: any;
  public addExpireForm: FormGroup;
  public editExpireForm: FormGroup;
  public lstExpire;
  public editedvalue;
  public rows = [];
  public srch = [];
  public adminId = sessionStorage.getItem("adminId");
  user_type: string;
  jobswriteHr: string;
  jobsWrite: string;
  jobsWriteSub: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobsWrite = sessionStorage.getItem("jobsWrite");
    this.jobsWriteSub = sessionStorage.getItem("jobsWriteSub");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadExpire();

    this.addExpireForm = this.formBuilder.group({
      Expirelevel: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
    this.editExpireForm = this.formBuilder.group({
      Expirelevel: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadExpire() {
    this.http
      .get(
        "http://localhost:8443/admin/experienceLevel/getExperienceLevel" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.lstExpire = data;
        this.rows = this.lstExpire;
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
  // Add experience  Modal Api Call
  addExpire() {
    if (this.addExpireForm.invalid) {
      this.markFormGroupTouched(this.addExpireForm);
      return;
    }
    if (this.addExpireForm.valid) {
      let obj = {
        experience: this.addExpireForm.value.Expirelevel,
        status: this.addExpireForm.value.StatusName,
        adminId: this.adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/experienceLevel/createExperienceLevel",
          obj
        )
        .subscribe((data) => {
          this.LoadExpire();
          // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   dtInstance.destroy();
          // });
        });

      $("#add_employee").modal("hide");
      this.addExpireForm.reset();
      this.toastr.success("Add experience added sucessfully...!", "Success");
    }
  }

  editExpire() {
    if (this.editExpireForm.valid) {
      let id = this.editId;
      let obj = {
        experience: this.editExpireForm.value.Expirelevel,
        status: this.editExpireForm.value.StatusName,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/experienceLevel/updateExperienceLevel" +
            "/" +
            id,
          obj
        )
        .subscribe((data1) => {
          this.LoadExpire();

          // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   dtInstance.destroy();
          // });
        });
      $("#edit_job").modal("hide");
      this.toastr.success("Edit experience Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;

    const index = this.lstExpire.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstExpire[index];
    this.editExpireForm.patchValue({
      Expirelevel: toSetValues.experience,
      StatusName: toSetValues.status,
    });
  }
  deleteExpire() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/experienceLevel/deleteExperienceLevel" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.LoadExpire();
        $("#delete_job").modal("hide");
        this.toastr.success("candidate deleted sucessfully..!", "Success");
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

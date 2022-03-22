import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstDesignation: any;
  url: any = "designation";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public addDesignationForm: FormGroup;
  public editDesignationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadDesignation();

    this.addDesignationForm = this.formBuilder.group({
      Designation: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });

    this.editDesignationForm = this.formBuilder.group({
      Designation: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });
  }

  // Get designation list  Api Call
  LoadDesignation() {
    this.http.get("http://localhost:8443/admin/designation/getData").subscribe((data) => {
      console.log("getapi", data)
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
      this.markFormGroupTouched(this.addDesignationForm)
      return
    }
    if (this.addDesignationForm.valid) {
      let obj = {
        designation: this.addDesignationForm.value.Designation,
        departmentName: this.addDesignationForm.value.DepartmentName,
        id: 1,
      };
      this.http
        .post("http://localhost:8443/admin/designation/create",
          obj
        )
        .subscribe((res: any) => {
          console.log("result", res);

        });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadDesignation();
      $("#add_designation").modal("hide");
      this.addDesignationForm.reset();
      this.toastr.success("Desigantion added sucessfully...!", "Success");
    }
  }

  editDesignation() {
    let designationId = this.editId
    if (this.editDesignationForm.valid) {
      let obj = {
        designation: this.editDesignationForm.value.Designation,
        departmentName: this.editDesignationForm.value.DepartmentName,

      };
      this.http.patch("http://localhost:8443/admin/designation/update" + "/" + designationId, obj).subscribe((data1) => {
        console.log("patchapi", data1)
        this.LoadDesignation();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });

      $("#edit_designation").modal("hide");
      this.toastr.success("Department Updated sucessfully...!", "Success");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstDesignation.findIndex((item) => {
      return item.designationId === value;
    });
    let toSetValues = this.lstDesignation[index];
    console.log(toSetValues)
    this.editDesignationForm.setValue({
      Designation: toSetValues.designation,
      DepartmentName: toSetValues.departmentName,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteDesignation() {
    let designationId = this.tempId
    let obj = {
      status: 2
    };
    this.http.patch("http://localhost:8443/admin/designation/delete" + "/" + designationId, obj).subscribe((data1) => {
      this.LoadDesignation();
      console.log("deleteApi", data1)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });

      $("#delete_designation").modal("hide");
      this.toastr.success("Designation deleted sucessfully..!", "Success");
    });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

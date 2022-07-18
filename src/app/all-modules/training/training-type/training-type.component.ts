import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { A11yModule } from "@angular/cdk/a11y";

declare const $: any;
@Component({
  selector: "app-training-type",
  templateUrl: "./training-type.component.html",
  styleUrls: ["./training-type.component.css"],
})
export class TrainingTypeComponent implements OnInit, OnDestroy {
  lstTrainingType: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  url: any = "trainingtype";

  public rows = [];
  public srch = [];
  public tempId: any;
  public editId: any;
  public adminId: any;
  public id: any;
  public addTrainingTypeForm: FormGroup;
  public editTrainingTypeForm: FormGroup;
  user_type: string;
  trainingwriteHr: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.trainingwriteHr = sessionStorage.getItem("trainingwriteHr");
  }

  ngOnInit() {
    this.loadTrainingType();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.addTrainingTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editTrainingTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
  }

  // Get  goal type  Api Call
  loadTrainingType() {
    this.http.get("http://localhost:8443/admin/training/trainingtype/getData" + "/" + this.adminId).subscribe((data: any) => {
      //console.log("getApi", data)
      this.lstTrainingType = data;
      // this.dtTrigger.next();
      this.rows = this.lstTrainingType;
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
  addTrainingType() {
    if (this.addTrainingTypeForm.invalid) {
      this.markFormGroupTouched(this.addTrainingTypeForm)
      return
    }
    if (this.addTrainingTypeForm.valid) {
      let obj = {
        adminId: this.adminId,
        goalType: this.addTrainingTypeForm.value.GoalType,
        description: this.addTrainingTypeForm.value.Description,
        status: this.addTrainingTypeForm.value.Status,

      };
      this.http.post("http://localhost:8443/admin/training/trainingtype/create", obj).subscribe((data: any) => {
        //console.log("postApi", data)
        this.loadTrainingType();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });

      $("#add_type").modal("hide");
      this.addTrainingTypeForm.reset();
      this.toastr.success("Training type added sucessfully...!", "Success");
    }
  }

  editTrainingType() {
    if (this.editTrainingTypeForm.valid) {
      this.id = this.editId
      let obj = {
        goalType: this.editTrainingTypeForm.value.GoalType,
        description: this.editTrainingTypeForm.value.Description,
        status: this.editTrainingTypeForm.value.Status,
      };
      this.http.patch("http://localhost:8443/admin/training/trainingtype/update" + "/" + this.id, obj).subscribe((data: any) => {
        //console.log("updateApi", data)
        this.loadTrainingType();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });

      $("#edit_type").modal("hide");
      this.toastr.success("Training type Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTrainingType.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTrainingType[index];
    this.editTrainingTypeForm.setValue({
      GoalType: toSetValues.goalType,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteTrainingType() {
    let obj = {
      status: 2
    }
    this.http.patch("http://localhost:8443/admin/training/trainingtype/delete" + "/" + this.tempId, obj).subscribe((data: any) => {
      //console.log("deleteApi", data)
      this.loadTrainingType();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });

      $("#delete_type").modal("hide");
      this.toastr.success("Training type deleted sucessfully..!", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  updateStatus(val, id) {
    //console.log("agdgasdhgaj", val, id)
    this.http.patch("http://localhost:8443/admin/training/trainingtype/update" + "/" + id, { status: val }).subscribe((data: any) => {
      //console.log("updateStatus", data);
      this.loadTrainingType();

    })
  }



}

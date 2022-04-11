import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-training-list",
  templateUrl: "./training-list.component.html",
  styleUrls: ["./training-list.component.css"],
})
export class TrainingListComponent implements OnInit, OnDestroy {
  lstTraininglist: any[];
  url: any = "traininglist";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public tempId: any;
  public editId: any;
  public adminId = sessionStorage.getItem("adminId")
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addTrainerForm: FormGroup;
  public editTrainerForm: FormGroup;
  public start;
  public end;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadtrainerlist();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip", // ... skipped ...
    };

    this.addTrainerForm = this.formBuilder.group({
      Type: ["", [Validators.required]],
      TranierName: ["", [Validators.required]],
      EmployeeName: ["", [Validators.required]],
      startDateTime: ["", [Validators.required]],
      endDateTime: ["", [Validators.required]],
      costName: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });

    this.editTrainerForm = this.formBuilder.group({
      Type: ["", [Validators.required]],
      TranierName: ["", [Validators.required]],
      EmployeeName: ["", [Validators.required]],
      startDateTime: ["", [Validators.required]],
      endDateTime: ["", [Validators.required]],
      costName: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Get  trainer Api Call
  loadtrainerlist() {
    this.http.get("http://localhost:8443/admin/training/traininglist/getData" + "/" + this.adminId).subscribe((data: any) => {
      console.log(data, "getApi")
      this.lstTraininglist = data;
      this.rows = this.lstTraininglist;
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
    if (this.addTrainerForm.invalid) {
      this.markFormGroupTouched(this.addTrainerForm)
      return
    }
    if (this.addTrainerForm.valid) {
      let StartDatetime = this.pipe.transform(
        this.addTrainerForm.value.startDateTime,
        "dd-MM-yyyy"
      );
      let EndDatetime = this.pipe.transform(
        this.addTrainerForm.value.endDateTime,
        "dd-MM-yyyy"
      );
      let obj = {
        trainingType: this.addTrainerForm.value.Type,
        trainerName: this.addTrainerForm.value.TranierName,
        employeeName: this.addTrainerForm.value.EmployeeName,
        // timeDuration: "7 May 2019 - 10 May 2019",
        startDate: StartDatetime,
        endDate: EndDatetime,
        costName: this.addTrainerForm.value.costName,
        description: this.addTrainerForm.value.Description,
        status: this.addTrainerForm.value.StatusName,
        adminId: this.adminId
      };
      this.http.post("http://localhost:8443/admin/training/traininglist/create", obj).subscribe((data: any) => {
        console.log("postApi", data)
        this.loadtrainerlist();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

      $("#add_training").modal("hide");
      this.addTrainerForm.reset();
      this.toastr.success("Training added sucessfully...!", "Success");
    }
  }

  // to know the date picker changes

  from(data) {
    this.start = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.end = this.pipe.transform(data, "dd-MM-yyyy");
  }
  editTrainingType() {
    if (this.editTrainerForm.valid) {
      let id = this.editId
      let obj = {
        trainingType: this.editTrainerForm.value.Type,
        trainer: this.editTrainerForm.value.TranierName,
        employeeName: this.editTrainerForm.value.EmployeeName,
        // timeDuration: "7 May 2019 - 10 May 2019",
        startDate: this.start,
        endDate: this.end,
        costName: this.editTrainerForm.value.costName,
        description: this.editTrainerForm.value.Description,
        status: this.editTrainerForm.value.StatusName,

      };
      this.http.patch("http://localhost:8443/admin/training/traininglist/update" + "/" + id, obj).subscribe((data: any) => {
        console.log("updateApi", data)
        this.loadtrainerlist();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

      $("#edit_training").modal("hide");
      this.toastr.success("Training Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTraininglist.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTraininglist[index];
    this.editTrainerForm.setValue({
      Type: toSetValues.trainingType,
      TranierName: toSetValues.trainerName,
      EmployeeName: toSetValues.employeeName,
      startDateTime: toSetValues.startDate,
      endDateTime: toSetValues.endDate,
      costName: toSetValues.costName,
      Description: toSetValues.description,
      StatusName: toSetValues.status,
    });
  }

  deleteTraining() {
    let obj = {
      status: 2,
    }
    this.http.patch("http://localhost:8443/admin/training/traininglist/delete" + "/" + this.tempId, obj).subscribe((data) => {
      console.log("deleteApi", data)
      this.loadtrainerlist();
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });

    $("#delete_training").modal("hide");
    this.toastr.success("Training  deleted sucessfully..!", "Success");
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

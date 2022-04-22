import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

declare const $: any;
@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.css"],
})
export class TrainersComponent implements OnInit, OnDestroy {
  lstTrainer: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  url: any = "trainers";

  public rows = [];
  public srch = [];
  public tempId: any;
  public editId: any;
  public id: any;
  public adminId = sessionStorage.getItem("adminId");
  public addTrainerForm: FormGroup;
  public editTrainerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadtrainer();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addTrainerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      RoleName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });

    this.editTrainerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      RoleName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
  }

  // Get  trainer Api Call
  loadtrainer() {
    this.http.get("http://localhost:8443/admin/training/trainers/getData" + "/" + this.adminId).subscribe((data: any) => {
      console.log("getApi", data)
      this.lstTrainer = data;
      // this.dtTrigger.next();
      this.rows = this.lstTrainer;
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
  addTrainer() {
    if (this.addTrainerForm.invalid) {
      this.markFormGroupTouched(this.addTrainerForm)
      return
    }
    if (this.addTrainerForm.valid) {
      let obj = {
        firstName: this.addTrainerForm.value.firstName,
        lastName: this.addTrainerForm.value.lastName,
        email: this.addTrainerForm.value.Email,
        role: this.addTrainerForm.value.RoleName,
        phone: this.addTrainerForm.value.phoneNumber,
        description: this.addTrainerForm.value.Description,
        status: this.addTrainerForm.value.StatusName,
        adminId: this.adminId
      };
      console.log("obj", obj)
      this.http.post("http://localhost:8443/admin/training/trainers/create", obj).subscribe((data) => {
        console.log(data, "postApi.......")
        this.loadtrainer();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });

      $("#add_trainer").modal("hide");
      this.addTrainerForm.reset();
      this.toastr.success("Trainer added sucessfully...!", "Success");
    }
  }

  editTrainer() {
    if (this.editTrainerForm.valid) {
      this.id = this.editId
      let obj = {
        firstName: this.editTrainerForm.value.firstName,
        lastName: this.editTrainerForm.value.lastName,
        mail: this.editTrainerForm.value.Email,
        role: this.editTrainerForm.value.RoleName,
        phone: this.editTrainerForm.value.phoneNumber,
        description: this.editTrainerForm.value.Description,
        status: this.editTrainerForm.value.StatusName,

      };
      this.http.patch("http://localhost:8443/admin/training/trainers/update" + "/" + this.id, obj).subscribe((data: any) => {
        console.log("updateApi", data)
        this.loadtrainer();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });

      $("#edit_trainer").modal("hide");
      this.toastr.success("Trainer Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTrainer.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTrainer[index];
    this.editTrainerForm.patchValue({
      firstName: toSetValues.firstName,
      lastName: toSetValues.lastName,
      Email: toSetValues.email,
      RoleName: toSetValues.role,
      phoneNumber: toSetValues.phone,
      Description: toSetValues.description,
      StatusName: toSetValues.status,
    });
  }
  deleteTrainer() {
    this.id = this.tempId;
    let obj = {
      status: 2,
    }
    this.http.patch("http://localhost:8443/admin/training/trainers/delete" + "/" + this.id, obj).subscribe((data: any) => {
      console.log("deleteApi", data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadtrainer();
      $("#delete_trainer").modal("hide");
      this.toastr.success("Trainer deleted sucessfully..!", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  updateStatus(val, id) {
    this.http.patch("http://localhost:8443/admin/training/trainers/update" + "/" + id, { status: val }).subscribe((data) => {
      console.log("updatestatus", data);
      this.loadtrainer();
    })
  }

  // getId(id) {
  //   sessionStorage.setItem("empid", id);
  //   this.router.navigate(["/layout/employees/employeeprofile"]);
  // }
}

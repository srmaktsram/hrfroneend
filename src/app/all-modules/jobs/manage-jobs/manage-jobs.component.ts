import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-manage-jobs",
  templateUrl: "./manage-jobs.component.html",
  styleUrls: ["./manage-jobs.component.css"],
})
export class ManageJobsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "manageJobs";
  public allManageJobs: any = [];
  public addManageJobs: FormGroup;
  public editManageJobs: FormGroup;
  public editId: any;
  public tempId: any;
  public pipe = new DatePipe("en-US");
  public purchaseDateFormat;
  public purchaseToDateFormat;
  public adminId = sessionStorage.getItem("adminId");
  dataarr: any;
  srch: any[];
  jobs: boolean;
  user_type: string;
  jobswriteHr: string;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");
    this.LoadDepartment();
    


  }
  LoadDepartment() {
    this.http
      .get("http://localhost:8443/admin/department/getData")
      .subscribe((data) => {
        this.dataarr = data;
        this.srch = this.dataarr;
      });
  }

  ngOnInit() {
    this.getManageJobs();
    this.getNotifications()

    // Add Provident Form Validation And Getting Values

    this.addManageJobs = this.formBuilder.group({
      addJobTitle: ["", [Validators.required]],
      addDepartment: ["", [Validators.required]],
      addStartDate: ["", [Validators.required]],
      addExpireDate: ["", [Validators.required]],
      addJobLocation: ["", [Validators.required]],
      addVacancy: ["", [Validators.required]],
      addExperience: ["", [Validators.required]],
      addAge: ["", [Validators.required]],
      addSalaryFrom: ["", [Validators.required]],
      addSalaryTo: ["", [Validators.required]],
      addJobType: ["", [Validators.required]],
      addStatus: ["", [Validators.required]],
      addDescription: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editManageJobs = this.formBuilder.group({
      editJobTitle: ["", [Validators.required]],
      editDepartment: ["", [Validators.required]],
      editStartDate: ["", [Validators.required]],
      editExpireDate: ["", [Validators.required]],
      ediJobLocation: ["", [Validators.required]],
      editVacancy: ["", [Validators.required]],
      editExperience: ["", [Validators.required]],
      editAge: ["", [Validators.required]],
      editSalaryFrom: ["", [Validators.required]],
      editSalaryTo: ["", [Validators.required]],
      editJobType: ["", [Validators.required]],
      editStatus: ["", [Validators.required]],
      editDescription: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getManageJobs() {
    this.http
      .get(
        "http://localhost:8443/admin/manageJobs/getManageJobs" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.allManageJobs = data;
      });
  }
  ///////
  getNotifications() {
    this.http
      .get(
        "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.jobs = data[0].notification.jobs;
      });
  }

  // Add Provident Modal Api Call

  addJobs() {
    if (this.addManageJobs.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addManageJobs.value.addStartDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addManageJobs.value.addExpireDate,
        "dd-MM-yyyy"
      );
      let obj = {
        jobTitle: this.addManageJobs.value.addJobTitle,
        department: this.addManageJobs.value.addDepartment,
        startDate: purchaseDateFormat,
        expireDate: purchaseToDateFormat,
        jobLocation: this.addManageJobs.value.addJobLocation,
        vacancy: this.addManageJobs.value.addVacancy,
        experience: this.addManageJobs.value.addExperience,
        age: this.addManageJobs.value.addAge,
        salaryFrom: this.addManageJobs.value.addSalaryFrom,
        salaryTo: this.addManageJobs.value.addSalaryTo,
        jobType: this.addManageJobs.value.addJobType,
        status: this.addManageJobs.value.addStatus,
        description: this.addManageJobs.value.addDescription,
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/manageJobs/createManageJobs", obj)
        .subscribe((data:any) => {
          this.getManageJobs();
          let document = data.data;
          let author = "Admin ";
          let message = 'added a job for ';
          let functions = document.jobTitle+' post';
          let time = document.createDate;
            if (this.jobs == true) {

              this.http
                .post(
                  "http://localhost:8443/admin/allNotification/createNotification" +
                    "/" +
                    this.adminId,
                  { message, author, functions, time }
                )
                .subscribe((data: any) => {
                });
            }
          
        });

      $("#add_job").modal("hide");
      this.addManageJobs.reset();
      this.toastr.success("Job is added", "Success");
    }
  }
  // to know the date picker changes

  from(data) {
    this.purchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.purchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Provident Modal Api Call

  editJobs() {
    if (this.editManageJobs.valid) {
      let id = this.editId;
      let obj = {
        jobTitle: this.editManageJobs.value.editJobTitle,
        department: this.editManageJobs.value.editDepartment,
        startDate: this.purchaseDateFormat,
        expireDate: this.purchaseToDateFormat,
        jobLocation: this.editManageJobs.value.ediJobLocation,
        vacancy: this.editManageJobs.value.editVacancy,
        experience: this.editManageJobs.value.editExperience,
        age: this.editManageJobs.value.editAge,
        salaryFrom: this.editManageJobs.value.editSalaryFrom,
        salaryTo: this.editManageJobs.value.editSalaryTo,
        jobType: this.editManageJobs.value.editJobType,
        status: this.editManageJobs.value.editStatus,
        description: this.editManageJobs.value.editDescription,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/manageJobs/updateManageJobs" + "/" + id,
          obj
        )
        .subscribe((data1) => {
          this.getManageJobs();
        });
      $("#edit_job").modal("hide");
      this.toastr.success("Job is edited", "Success");
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allManageJobs.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allManageJobs[index];
    this.editManageJobs.patchValue({
      editJobTitle: toSetValues.jobTitle,
      editDepartment: toSetValues.department,
      editStartDate: toSetValues.startDate,
      editExpireDate: toSetValues.expireDate,
      ediJobLocation: toSetValues.jobLocation,
      editVacancy: toSetValues.vacancy,
      editExperience: toSetValues.experience,
      editAge: toSetValues.age,
      editSalaryFrom: toSetValues.salaryFrom,
      editSalaryTo: toSetValues.salaryTo,
      editJobType: toSetValues.jobType,
      editStatus: toSetValues.status,
      editDescription: toSetValues.description,
    });
  }

  // Delete Provident Modal Api Call

  deleteJobs() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/manageJobs/deleteManageJobs" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getManageJobs();
        this.getManageJobs();
        $("#delete_job").modal("hide");
        this.toastr.success("Job is deleted", "Success");
      });
  }

  //////////////

  updateStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/admin/manageJobs/updateManageJobsStatus" +
          "/" +
          id,
        { status }
      )
      .subscribe((res) => {
        this.getManageJobs();
      });
  }

  /////////////////////////////////////////////
  updateJobType(data, id) {
    const jobType = data;

    this.http
      .patch(
        "http://localhost:8443/admin/manageJobs/updateManageJobsJobType" +
          "/" +
          id,
        { jobType }
      )
      .subscribe((res) => {
        this.getManageJobs();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

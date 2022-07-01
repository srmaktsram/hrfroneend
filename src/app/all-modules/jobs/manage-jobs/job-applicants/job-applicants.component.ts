import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-job-applicants",
  templateUrl: "./job-applicants.component.html",
  styleUrls: ["./job-applicants.component.css"],
})
export class JobApplicantsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "appliedCandidates";
  public allAppliedCandidates: any = [];
  public scheduleForm: FormGroup;
  constructor(
    private allModuleService: AllModulesService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.scheduleForm = this.fb.group({
      interviewTime: ["", Validators.required],
      interviewDate: ["", Validators.required],
      interviewer: ["", Validators.required],
    });

    this.getAppliedCandidates();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getAppliedCandidates() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getJobRegister")
      .subscribe((data: any) => {
        this.allAppliedCandidates = data;
        console.log("thi si shte .......", this.allAppliedCandidates);
        this.dtTrigger.next();
      });
  }

  selectStatus(val, id) {
    var statusValue;
    if (val === "New") {
      statusValue = "0";
    } else if (val === "Hired") {
      statusValue = "5";
    } else if (val === "Rejected") {
      statusValue = "2";
    } else if (val === "Interviewed") {
      statusValue = "3";
    }

    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobRegister" +
          "/" +
          id,
        { status: statusValue }
      )
      .subscribe((res: any) => {
        window.location.reload();
        console.log(res, "this is the update status");
      });
  }

  scheduleupdate(id) {
    var jobId = id;
    var obj = {
      interviewTime: this.scheduleForm.value.interviewTime,
      interviewDate: this.scheduleForm.value.interviewDate,
      interviewer: this.scheduleForm.value.interviewer,
      status: "3",
    };
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobRegister" +
          "/" +
          jobId,
        obj
      )
      .subscribe((res: any) => {
        if (res) {
          this.sendEmail(res.id);
        }
        window.location.reload();
        console.log(res, "this is the schedule interview");
      });
  }

  sendEmail(id) {
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/sendEmail" + "/" + id,
        {}
      )
      .subscribe((res: any) => {
        window.location.reload();
        console.log(res, "this is the schedule interview");
      });
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-job-applicants",
  templateUrl: "./job-applicants.component.html",
  styleUrls: ["./job-applicants.component.css"],
})
export class JobApplicantsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "appliedCandidates";
  public allAppliedCandidates: any = [];
  public scheduleForm: FormGroup;
  public tempId: any;
  user_type: string;
  appliedCandidateswriteRecep: string;
  jobswriteHr: string;
  constructor(
    private allModuleService: AllModulesService,
    private http: HttpClient,

    private fb: FormBuilder,
    private _snackBar: MatSnackBar

  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");

    this.appliedCandidateswriteRecep = sessionStorage.getItem("appliedCandidateswriteRecep");
  }


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
      .get("http://localhost:8443/admin/job/jobRegister/getAppliedCandidate")
      .subscribe((data: any) => {
        this.allAppliedCandidates = data;
        console.log(
          "this is Applied Condidate>>> .......",
          this.allAppliedCandidates
        );
        this.dtTrigger.next();
      });
  }

  selectStatus(val, id) {
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobRegister" +
          "/" +
          id,
        { status: val }
      )
      .subscribe((res: any) => {
        this.getAppliedCandidates();
        console.log(res, "this is the update status");
      });
    $("schedule").modal("hide");
  }

  scheduleupdate() {
    var jobId = this.tempId;
    var obj = {
      interviewTime: this.scheduleForm.value.interviewTime,
      interviewDate: this.scheduleForm.value.interviewDate,
      interviewer: this.scheduleForm.value.interviewer,
      status: "Interviewed",
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
        this.getAppliedCandidates();
        $("schedule").modal("hide");

        console.log(res, "this is the schedule interview");
      });
  }
  ////////////////////////////send email /////////////////////////////////
  sendEmail(id) {
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/sendEmail" + "/" + id,
        {}
      )
      .subscribe((res: any) => {
        this.getAppliedCandidates();
        console.log(res, "this is the schedule interview");
      });
    $("schedule").modal("hide");
    this._snackBar.open("Mail Send sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

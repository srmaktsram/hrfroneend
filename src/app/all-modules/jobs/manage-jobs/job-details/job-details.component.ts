import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
declare const $: any;
@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.css"],
})
export class JobDetailsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  jobId: any;
  jobDetails: any;
  public editForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.jobId = this.route.snapshot.queryParams["id"];
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      jobTitle: ["", Validators.required],
      department: ["", Validators.required],
      jobLocation: ["", Validators.required],
      vacancy: ["", Validators.required],
      experience: ["", Validators.required],
      age: ["", Validators.required],
      salaryFrom: ["", Validators.required],
      salaryTo: ["", Validators.required],
      jobType: ["", Validators.required],
      status: ["", Validators.required],
      startDate: ["", Validators.required],
      expireDate: ["", Validators.required],
      description: ["", Validators.required],
    });
    this.getSingleJobDetails();
  }

  getSingleJobDetails() {
    this.http
      .get(
        "http://localhost:8443/admin/manage_job/getJobDetails" +
          "/" +
          this.jobId
      )
      .subscribe((res: any) => {
        this.jobDetails = res;
      });
  }

  edit() {
    this.editForm.patchValue({
      jobTitle: this.jobDetails.jobTitle,
      department: this.jobDetails.department,
      jobLocation: this.jobDetails.jobLocation,
      vacancy: this.jobDetails.vacancy,
      experience: this.jobDetails.experience,
      age: this.jobDetails.age,
      salaryFrom: this.jobDetails.salaryFrom,
      salaryTo: this.jobDetails.salaryTo,
      jobType: this.jobDetails.jobType,
      status: this.jobDetails.status,
      startDate: this.jobDetails.startDate,
      expireDate: this.jobDetails.expireDate,
      description: this.jobDetails.description,
    });
  }

  saveEditJobDetails() {
    var obj = {
      jobTitle: this.editForm.value.jobTitle,
      department: this.editForm.value.department,
      jobLocation: this.editForm.value.jobLocation,
      vacancy: this.editForm.value.vacancy,
      experience: this.editForm.value.experience,
      age: this.editForm.value.age,
      salaryFrom: this.editForm.value.salaryFrom,
      salaryTo: this.editForm.value.salaryTo,
      jobType: this.editForm.value.jobType,
      status: this.editForm.value.status,
      startDate: this.editForm.value.startDate,
      expireDate: this.editForm.value.expireDate,
      description: this.editForm.value.description,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/manageJobs/updateManageJobs" +
          "/" +
          this.jobId,
        obj
      )
      .subscribe((res: any) => {
        console.log(res, "this is the job update Data");
      });
    $("#edit_job").modal("hide");
    this._snackBar.open("Job Details Updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

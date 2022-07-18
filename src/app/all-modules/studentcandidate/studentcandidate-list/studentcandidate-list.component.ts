import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-studentcandidate-list",
  templateUrl: "./studentcandidate-list.component.html",
  styleUrls: ["./studentcandidate-list.component.css"],
})
export class StudentcandidateListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public url: any = "candidate";
  public tempId: any;
  public allJobs = [];
  public editId: any;
  public addCandidateForm: FormGroup;
  public editCandidateForm: FormGroup;
  public lstCandidate = [];
  public editedvalue;
  public rows = [];
  public srch = [];
  multFile: any;
  candidateslistwriteRecep: string;
  user_type: string;
  jobswriteHr: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");
    this.candidateslistwriteRecep = sessionStorage.getItem("candidateslistwriteRecep");
    this.jobFunction();
  }

  ngOnInit() {
    // Floating Label

    if ($(".floating").length > 0) {
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass(
              "focused",
              e.type === "focus" || this.value.length > 0
            );
        })
        .trigger("blur");
    }
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadCandidate();
    this.addCandidateForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      CreateDate: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      resume: ["", [Validators.required]],
      jobTitle: ["", [Validators.required]],
    });
    this.editCandidateForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      createDate: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      resume: ["", [Validators.required]],
      jobTitle: ["", [Validators.required]],
    });
  }

  /////////////////////////////call function for jobTitel/////////////
  jobFunction() {
    this.http
      .get("http://localhost:8443/admin/manage_job/getAllJobsDetails")
      .subscribe((res: any) => {
        console.log("get all jobs >>>>>>>", res);
        this.allJobs = res;
      });
  }

  // Get department list  Api Call
  LoadCandidate() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getAllCandidate")
      .subscribe((data: any) => {
        this.lstCandidate = data;

        this.rows = this.lstCandidate;
        this.srch = [...this.rows];
      });
  }
  //search by name
  searchByCandidate(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  //search by mobile
  searchByMobile(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.mobile.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ////////////search Status   ////////////////////////////////////////////
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.status.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
    console.log("this.allJobs>>>>>>>>>>>>", this.rows);
  }

  /////////////////////////////////////////////////
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.multFile = event.target.files;
    }
  }
  // Add questions  Modal Api Call
  addCandidate() {
    var fd = new FormData();
    for (let pdfFile of this.multFile) {
      fd.append("file", pdfFile);
    }
    let params = new HttpParams();
    params = params.set("firstName", this.addCandidateForm.value.firstName);
    params = params.set("lastName", this.addCandidateForm.value.lastName);
    params = params.set("email", this.addCandidateForm.value.email);
    params = params.set("createdate", this.addCandidateForm.value.createdate);
    params = params.set("mobile", this.addCandidateForm.value.mobile);
    params = params.set("address", this.addCandidateForm.value.address);
    params = params.set("gender", this.addCandidateForm.value.gender);
    params = params.set("jobTitle", this.addCandidateForm.value.jobTitle);
    console.log("this is the params...>>>>>", params);
    this.http
      .post(
        "http://localhost:8443/admin/job/jobRegister/createJobRegister?" +
        params,
        fd
      )
      .subscribe((data: any) => {
        console.log(data);
        this.LoadCandidate();
      });

    $("#add_employee").modal("hide");
    this.addCandidateForm.reset();
    this._snackBar.open("Candidate added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  editCandidate() {
    var fd = new FormData();
    for (let pdfFile of this.multFile) {
      fd.append("file", pdfFile);
    }
    let params = new HttpParams();

    params = params.set("editId", this.editId);
    params = params.set("firstName", this.editCandidateForm.value.firstName);
    params = params.set("lastName", this.editCandidateForm.value.lastName);
    params = params.set("email", this.editCandidateForm.value.email);
    params = params.set("createdate", this.editCandidateForm.value.createdate);
    params = params.set("mobile", this.editCandidateForm.value.mobile);
    params = params.set("address", this.editCandidateForm.value.address);
    params = params.set("gender", this.editCandidateForm.value.gender);
    params = params.set("status", "1");
    params = params.set("jobTitle", this.editCandidateForm.value.jobTitle);

    console.log("this is the paramas>>>>>>", params);
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobDetails?" +
        params,
        fd
      )
      .subscribe((data: any) => {
        console.log(data);
        this.LoadCandidate();
      });

    $("#edit_job").modal("hide");

    this._snackBar.open("Job updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editedvalue = value.email;
    this.editId = value.id;
    const index = this.lstCandidate.findIndex((item) => {
      return item.id === value.id;
    });

    let toSetValues = this.lstCandidate[index];

    this.editCandidateForm.patchValue({
      email: toSetValues.email,
      createDate: toSetValues.createDate,
      mobile: toSetValues.mobile,
      address: toSetValues.address,
      gender: toSetValues.gender,
      resume: toSetValues.resume,
      firstName: toSetValues.firstName,
      lastName: toSetValues.lastName,
      jobTitle: toSetValues.jobTitle,
    });
  }

  deleteCandidate() {
    var obj = {
      status: "Rejected",
    };
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobRegister" +
        "/" +
        this.tempId,
        obj
      )
      .subscribe((data: any) => {
        this.LoadCandidate();
      });

    $("#delete_job").modal("hide");

    this._snackBar.open("Candidate deleted sucessfully !", "", {
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

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-studentcandidate-list",
  templateUrl: "./studentcandidate-list.component.html",
  styleUrls: ["./studentcandidate-list.component.css"],
})
export class StudentcandidateListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public url: any = "candidate";
  public tempId: any;
  public editId: any;
  public addCandidateForm: FormGroup;
  public editCandidateForm: FormGroup;
  public lstCandidate = [];
  public editedvalue;
  public rows = [];
  public srch = [];
  multFile: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

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
      email: ["", [Validators.required]],
      CreateDate: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      resume: ["", [Validators.required]],
    });
    this.editCandidateForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      createDate: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      resume: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadCandidate() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getJobRegister")
      .subscribe((data: any) => {
        this.lstCandidate = data;

        this.rows = this.lstCandidate;
        this.srch = [...this.rows];
      });
  }
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
    this.toastr.success("Add candidate added sucessfully...!", "Success");
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
    this.toastr.success("Edit job Updated sucessfully...!", "Success");
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
    });
  }

  deleteCandidate() {
    var obj = {
      status: "2",
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
    this.toastr.success("candidate deleted sucessfully..!", "Success");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

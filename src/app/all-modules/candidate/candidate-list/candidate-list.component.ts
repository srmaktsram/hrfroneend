import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { group } from "console";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: "app-candidate-list",
  templateUrl: "./candidate-list.component.html",
  styleUrls: ["./candidate-list.component.css"],
})
export class CandidateListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstFees: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public url: any = "candidatelist";
  public joiningForm: FormGroup;
  user_type: string;
  shortlistedcandidateswriteRecep: string;
  jobswriteHr: string;

  constructor(
    private srvModuleService: AllModulesService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");

    this.shortlistedcandidateswriteRecep = sessionStorage.getItem("shortlistedcandidateswriteRecep");
  }

  ngOnInit() {
    this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.joiningForm = this.fb.group({
      jobTitle: [""],
      jobLocation: [""],
      joiningDate: [""],
      salaryFrom: [""],
      jobType: [""],
    });
  }

  // Get Fees List  Api Call
  loadFees() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getQualifiedCandidate")
      .subscribe((data: any) => {
        this.lstFees = data;
        this.rows = this.lstFees;
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

  ////////////search Status   //////////////////////////////////////////////////
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.status.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  /////////////////////////joining Email send//////////////////////
  sendJoiningMail(jobTitle, jobLocation, joiningDate, salaryFrom, jobType) {
    alert(this.tempId);
    var obj = {
      jobTitle: jobTitle,
      jobLocation: jobLocation,
      joiningDate: joiningDate,
      salaryFrom: salaryFrom,
      jobType: jobType,
    };
    this.http
      .post("http://localhost:8443/mainadmin/hr_user/sendNewMail", obj)
      .subscribe((res: any) => {
        console.log("this is the email sender Api>>>>>", res);
      });

    // this.http
    //   .patch(
    //     "http://localhost:8443/admin/job/jobRegister/sendJoinMail" +
    //       "/" +
    //       this.tempId,
    //     obj
    //   )
    //   .subscribe((res: any) => {});

    $("#send_email").modal("hide");
  }

  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { ComponentsModule } from "../../components/components.module";

declare const $: any;
@Component({
  selector: "app-scheduletiming-list",
  templateUrl: "./scheduletiming-list.component.html",
  styleUrls: ["./scheduletiming-list.component.css"],
})
export class ScheduletimingListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstFees = [];
  public allEmployee = [];
  public interviewerEmail: any;
  interviewerName: string;
  public currentStatus: any;
  user_type: string;
  scheduletimingwriteRecep: string;
  jobswriteHr: string;
  jobsWrite: string;
  jobsWriteSub: string;
  // public url: any = "scheduletiming";

  constructor(
    private srvModuleService: AllModulesService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobsWrite = sessionStorage.getItem("jobsWrite");
    this.jobsWriteSub = sessionStorage.getItem("jobsWriteSub");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");

    this.scheduletimingwriteRecep = sessionStorage.getItem("scheduletimingwriteRecep");
    this.selectInterviewer();
  }

  ngOnInit() {
    this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get Fees List  Api Call
  loadFees() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getScheduleInterview")
      .subscribe((data: any) => {
        this.lstFees = data;
        console.log(this.lstFees, "this.lstFees>>>>>>>");
      });
  }

  ////change Status/////////////////////////
  selectStatus(val, Id) {
    var id = Id;

    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/updateJobRegister" +
          "/" +
          id,
        { status: val }
      )
      .subscribe((res: any) => {
        console.log("After change status>>>>>>", res);
      });
    $("edit_job").modal("hide");
  }

  ///////////////////////////select interviewer/////////////////////////////////////////////
  selectInterviewer() {
    this.http
      .get("http://localhost:8443/auth/employeelogin/getAllEmployee")
      .subscribe((res: any) => {
        this.allEmployee = res;
        console.log("this is ALL EMPLOYEE>>>>>>>>>>>>", this.allEmployee);
      });
  }

  /////////////////////////send email /////////////////////////////////
  sendEmail(id, date, time) {
    if (this.interviewerEmail && this.interviewerName && date && time) {
      this.sendCondidateEmail(id, date, time, this.interviewerName);
      this.sendInterviwerEmail(
        date,
        time,
        this.interviewerName,
        this.interviewerEmail
      );
    }
  }
  //////////////////////Send Email in candidate Male///////////

  sendCondidateEmail(id, date, time, interviewer) {
    var obj = {
      interviewDate: date,
      interviewTime: time,
      interviewer: interviewer,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/sendEmail" + "/" + id,
        obj
      )
      .subscribe((res: any) => {
        console.log(res, "this is the schedule interview");
      });
  }

  //////////////////////Send Email in Interviewer Male///////////
  sendInterviwerEmail(date, time, interviewerName, interviewerEmail) {
    var obj = {
      interviewDate: date,
      interviewTime: time,
      interviewer: interviewerName,
      interviewerEmail: interviewerEmail,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/job/jobRegister/sendInterviewerEmail",
        obj
      )
      .subscribe((res: any) => {
        console.log(res, "this is the schedule interview");
      });
  }

  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getOneEmployee(event) {
    let val = event.target.value;

    this.http
      .get(
        "http://localhost:8443/auth/employeelogin/getInterviewer" + "/" + val
      )
      .subscribe((res: any) => {
        this.interviewerEmail = res.email;
        this.interviewerName = res.firstName + " " + res.lastName;

        console.log(
          "this is ALL interviewerEmail>>>>>>>>>>>>",
          this.interviewerEmail,
          "<><<<><><><>",
          this.interviewerName
        );
      });
  }
}

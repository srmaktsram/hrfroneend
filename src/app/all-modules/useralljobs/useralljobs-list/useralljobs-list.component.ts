import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-useralljobs-list",
  templateUrl: "./useralljobs-list.component.html",
  styleUrls: ["./useralljobs-list.component.css"],
})
export class UseralljobsListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  // public lstUseralljobs: any[];
  public url: any = "useralljobs";
  public tempId: any;
  public editId: any;
  public lstUseralljobs;

  public rows = [];
  public srch = [];
  lstDepartment: Object;
  lstDesignation: Object;
  public adminId = sessionStorage.getItem("adminId");
  allManageJobs: any;

  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.LoadDepartment();
    this.LoadDesignation();
  }
  LoadDepartment() {
    this.http
      .get("http://localhost:8443/admin/department/getData")
      .subscribe((data) => {
        this.lstDepartment = data;
        // this.rows = this.lstDepartment;
        // this.srch = [...this.rows];
      });
  }
  LoadDesignation() {
    this.http
      .get("http://localhost:8443/admin/designation/getData")
      .subscribe((data) => {
        this.lstDesignation = data;

        // this.rows = this.lstDesignation;
        // this.srch = [...this.rows];
      });
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.getManageJobs();
    // this.LoadUseralljobs();
  }
  // Get department list  Api Call
  // LoadUseralljobs() {
  //   this.srvModuleService.get(this.url).subscribe((data) => {
  //     this.lstUseralljobs = data;
  //     this.dtTrigger.next();
  //     this.rows = this.lstUseralljobs;
  //     this.srch = [...this.rows];
  //   });
  // }
  getManageJobs() {
    this.http
      .get(
        "http://localhost:8443/admin/manageJobs/getManageJobs" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.allManageJobs = data;
        this.rows = this.allManageJobs;
        this.srch = [...this.rows];
      });
  }

  //search by designation
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.jobTitle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by jobtype
  searchJob(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.jobType.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getManageJobs();
    }
  }

  //search by department
  searchDepartment(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.department.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-payslipreports-list",
  templateUrl: "./payslipreports-list.component.html",
  styleUrls: ["./payslipreports-list.component.css"],
})
export class PayslipreportsListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  // public lstUseralljobs: any[];
  public url: any = "payslip";
  public tempId: any;
  public editId: any;
  public lstPaylip;
  public rows = [];
  public srch = [];
  public adminId:any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private http:HttpClient,
    private toastr: ToastrService
  ) {
    this.adminId=sessionStorage.getItem("adminId")
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
    this.LoadPaylip();
  }
  // Get department list  Api Call
  LoadPaylip() {
    this.http.get("http://localhost:8443/admin/employeeSalary/getEmployeeSalary"+"/"+this.adminId).subscribe((data:any) => {
      this.lstPaylip = data;
      console.log(this.lstPaylip)
      this.dtTrigger.next();
      this.rows = this.lstPaylip;
      this.srch = [...this.rows];
    });
  }

  //search by designation
  searchEmployee(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name1.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by jobtype
  searchMonth(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.paymentmonth.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by department
  searchYear(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.paymentyear.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

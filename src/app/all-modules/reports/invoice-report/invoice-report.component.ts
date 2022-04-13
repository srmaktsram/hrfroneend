import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

declare const $: any;

@Component({
  selector: "app-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.css"],
})
export class InvoiceReportComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  invoices: any = [];
  id: any;
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  public dtTrigger: Subject<any> = new Subject();
public adminId:any;

  constructor(
    private router: Router,
    private http:HttpClient,
    private allModulesService: AllModulesService
  ) {
    this.adminId=sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //get all invoices
    this.getAllInvoices();
  }

  //get all invoices
  getAllInvoices() {
    this.http.get("http://localhost:8443/admin/invoices/adminGetInvoices"+"/"+this.adminId).subscribe((res:any) => {
      this.invoices = res.data;
      console.log(res.data)
      this.dtTrigger.next();
      this.rows = this.invoices;
      this.srch = [...this.rows];
    });
  }

  //getting id for selected row
  // deleteInvoice(estimate) {
  //   this.id = estimate.id;
  // }

  // delete method for deleting rows
  // delete() {
  //   let id: any = Number(this.id);
  //   this.http.patch("http://localhost:8443/admin/",{}).subscribe((res) => {
  //     this.router.navigate(["/reports/edit-invoice-report"]);
  //     this.getAllInvoices();
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //     });
  //   });
  // }

  //search by from date
  searchFromDate(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.invoice_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    // $(".floating")
    //   .on("focus blur", function (e) {
    //     $(this)
    //       .parents(".form-focus")
    //       .toggleClass("focused", e.type === "focus" || this.value.length > 0);
    //   })
    //   .trigger("blur");
  }

  //search by to date
  searchToDate(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.due_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    // $(".floating")
    //   .on("focus blur", function (e) {
    //     $(this)
    //       .parents(".form-focus")
    //       .toggleClass("focused", e.type === "focus" || this.value.length > 0);
    //   })
    //   .trigger("blur");
  }

  ////searching in both from and to//////////

  searchFromTo(startDate,endDate){
    console.log(this.srch)
    this.rows.splice(0, this.rows.length);
    this.srch.map((item)=>{
      let currDate=item.createDate.split();
      console.log("After SPLITS>>>>>>>>",currDate,"Date>>>>>>>>>",startDate);
      if(startDate<=currDate[0] && currDate[0]<=endDate){
        this.rows.push(item)
      }
    })
  }

  //search by status

  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.client.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ngxCsv } from "ngx-csv";

declare const $: any;
@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.css"],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  invoices: any = [];
  public csvData=[];
  id: any;
  public rows = [];
  public srch = [];
  public arr=[];
  public pipe = new DatePipe("en-US");
  public dtTrigger: Subject<any> = new Subject();
  adminId: string;
  user_type: string;
  saleswriteFin: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private allModulesService: AllModulesService
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    sessionStorage.removeItem("invoiceNo");
    this.user_type = sessionStorage.getItem("user_type");
    this.saleswriteFin = sessionStorage.getItem("saleswriteFin");
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
    this.getInvNo();
    this.getcsvData();
  }
  getInvNo() {
    this.http
      .get(
        "http://localhost:8443/admin/invoices/getOneInvoiceNumber" +
          "/" +
          this.adminId
      )
      .subscribe((res: any) => {
        let total = String(parseInt(res.number) + 1);
        sessionStorage.setItem("invoiceNo", total);
      });
  }
  //get all invoices
  getAllInvoices() {
    let adminId = sessionStorage.getItem("adminId");
    this.http
      .get(
        "http://localhost:8443/admin/invoices/adminGetInvoices" + "/" + adminId
      )
      .subscribe((res: any) => {
        this.invoices = res.data;

        this.rows = this.invoices;
        this.srch = [...this.rows];
      });
  }

  getcsvData(){
    let adminId = sessionStorage.getItem("adminId");
    this.http
      .get(
        "http://localhost:8443/admin/invoices/InvoicesCSV" + "/" + adminId
      )
      .subscribe((res: any) => {
        this.csvData = res.data;
      
      });

  }

  
  csv(){
    this.getcsvData();
    
    var data=this.csvData;
    

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      title: 'Invoice in csv',
      useBom: true,
      noDownload: false,
      headers: [ "Client","Email", "Invoice Date", "Due Date","Invoice Number","total Amount","Status"]
    };
   
    new ngxCsv(data, "Invoice",options);
  }

  updateStatus(val, id) {
    this.http
      .patch("http://localhost:8443/admin/invoices/updateInvoices" + "/" + id, {
        status: val,
      })
      .subscribe((res: any) => {
        this.getAllInvoices();
      });
  }

  //getting id for selected row
  deleteInvoice(estimate) {
    this.id = estimate.id;
  }

  // delete method for deleting rows
  delete() {
    let id: any = this.id;
    this.http
      .patch("http://localhost:8443/admin/invoices/deleteInvoices" + "/" + id, {
        status: 2,
      })
      .subscribe((res) => {
        this.router.navigate(["/layout/accounts/invoices"]);
        this.getAllInvoices();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
  }

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

  //search by status

  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

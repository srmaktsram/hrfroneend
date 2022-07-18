



import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-estimates",
  templateUrl: "./estimates.component.html",
  styleUrls: ["./estimates.component.css"],
})
export class EstimatesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public estimates = [];
  public id;
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  public dtTrigger: Subject<any> = new Subject();
  adminId: any;
  user_type: string;
  saleswriteFin: string;
  constructor(
    
    private router: Router,
    private http:HttpClient,
    private allModulesService: AllModulesService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.saleswriteFin = sessionStorage.getItem("saleswriteFin");
    this.adminId =sessionStorage.getItem("adminId")
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

    //to get all estimates
    this.getAllEstimates();
  }

  //get id for the selected delete row
  deleteEstimate(estimate) {
    this.id = estimate.id;
  }

  //get estimate list
  getAllEstimates() {
    this.http.get("http://localhost:8443/admin/estimates/getEstimates"+"/"+this.adminId).subscribe((res:any) => {
     this.estimates=(res.data)
     console.log("ALL GET ESTIMATE",this.estimates)
    
      this.rows = this.estimates;
      this.srch = [...this.rows];
    });
  }



  //  updateStatus ............
  updateStatus(val,id){
 
    this.http.patch("http://localhost:8443/admin/estimates/updateEstimates"+"/"+id, {status:val}).subscribe((res:any)=>{
console.log(res);
this.getAllEstimates();
    })

  }

  //delete method of estimate list
  delete() {
    let id: any = this.id;
  
    this.http.patch("http://localhost:8443/admin/estimates/deleteEstimates"+"/"+id, {}).subscribe((res:any) => {
      
      this.getAllEstimates();
     
    });
  }

  //search by from date
  searchFromDate(val) {
   
    if(val){
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    
    
    this.rows.splice(0, this.rows.length);
   
    let temp = this.srch.filter(function (d) {
      return d.estimateDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
  
    this.rows.push(...temp);
  }else{
    this.getAllEstimates()
  }
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
    if(val){
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.expiryDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
  }else{
    this.getAllEstimates()
  }
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
      // val = val.toLowerCase();
      
      return d.status.indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

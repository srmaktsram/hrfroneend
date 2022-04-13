import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: 'app-paymentreports-list',
  templateUrl: './paymentreports-list.component.html',
  styleUrls: ['./paymentreports-list.component.css']
})
export class PaymentreportsListComponent implements OnInit {
@ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public adminId :any;
   public pipe = new DatePipe("en-US");
public rows=[];
public srch=[];
  public lstFees: any[];
  public url: any = "paymentreports";
  constructor(private srvModuleService: AllModulesService,
    private http:HttpClient) { 
      this.adminId=sessionStorage.getItem("adminId");
    }

  ngOnInit() {
    // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
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
    this.http.get("http://localhost:8443/admin/payments/adminGetPayments"+"/"+this.adminId).subscribe((data:any) => {
      console.log(data)
      this.lstFees = data;
      this.rows= this.lstFees;
      this.srch=[...this.rows]
      // this.dtTrigger.next();
    });
  }
  
  searchFromAndTo(startDate,endDate){
    console.log("ARGUMENTS>>>>>>>>>>>>>",startDate,endDate)
    this.rows.splice(0, this.rows.length);
  
  this.srch.map((item)=>{

      let currDate=item.createDate.split()
     
     if( startDate<= currDate[0] && currDate[0]<=endDate){

    
       this.rows.push(item);
      //  console.log("this.rows AFTER PUSH............>>>>",this.rows)
      }
     
    })
  
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

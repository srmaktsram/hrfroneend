import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;

@Component({
  selector: 'app-leavereports-list',
  templateUrl: './leavereports-list.component.html',
  styleUrls: ['./leavereports-list.component.css']
})
export class LeavereportsListComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
    public pipe = new DatePipe("en-US");
  public lstFees: any[];
  public url: any = "leavereports";
  public adminId:any;
  public dep=[];
  public rows=[];
  public srch=[];

  constructor(private srvModuleService: AllModulesService,
    private http:HttpClient) { 
      this.adminId=sessionStorage.getItem("adminId");
      this.selecteDepartment();
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
    this.http.get("http://localhost:8443/admin/leaves/searchleaves"+"/"+this.url).subscribe((data:any) => {
      console.log(data)
      this.lstFees = data;
      this.rows=this.lstFees;
      this.srch=[...this.rows]
      this.dtTrigger.next();
    });
  }

  ////searching from and to ////////////////
  searchFromAndTo(startDate,endDate){
    this.rows.splice(0,this.rows.length)
    this.srch.map((item)=>{
      let currDate=item.createDate.split()
      if(startDate<=currDate[0] && currDate[0]<=endDate){
        this.rows.push(item);
      }
    })

  }
  

//////////////select Department//////////////////////////
  selecteDepartment(){
    this.http.get("http://localhost:8443/admin/department/getAdminData"+"/"+this.adminId).subscribe((data:any)=>{
      this.dep=data
      console.log("this is Dep",this.dep)
    })
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

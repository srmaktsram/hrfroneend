import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: 'app-dailyreports-list',
  templateUrl: './dailyreports-list.component.html',
  styleUrls: ['./dailyreports-list.component.css']
})
export class DailyreportsListComponent implements OnInit, OnDestroy  {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  // public lstUseralljobs: any[];
	public url: any = "dailyreport";
	public tempId: any;
    public editId: any;
    public lstDailyreport;
    public dep=[];
   public adminId:any;
    public rows = [];
  public srch = [];
  public totalEmployee:any;
  public totalPresent:any;
  public totalAbsent:any;
  public totalLeft:any;
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private http:HttpClient,
    private toastr: ToastrService
  	) { 
      this.adminId=sessionStorage.getItem("adminId");
      this.selectDepartment();
    }

  ngOnInit() {
        // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadDailyreport();
  }
   // Get department list  Api Call
  LoadDailyreport() {
    this.http.get("http://localhost:8443/admin/allemployees/getallEmployee"+"/"+this.adminId).subscribe((data:any) => {
      this.lstDailyreport = data;
      console.log( data.length)
      this.totalEmployee=this.lstDailyreport.length
      this.dtTrigger.next();
       this.rows = this.lstDailyreport;
      this.srch = [...this.rows];
     
      });
  }
///////search
  searchFromAndTo(startDate,endDate){
 this.rows.splice(0,this.rows.length);
 this.srch.map((item)=>{
   console.log(item.createDate)
   if(startDate<=item.createDate && item.createDate<=endDate){
     this.rows.push(item);
   }
 })

  }




  // total(){
  //   this.http.get("http://localhost:8443/admin"+"/"+this.adminId).subscribe((res:any)=>{
     
  //   })
  // }

  //search by Department
  searchEmployee(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name1.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ///////////select Department//////////////////////
  selectDepartment(){
    this.http.get("http://localhost:8443/admin/department/getAdminData"+"/"+this.adminId).subscribe((data:any)=>{
      this.dep=data
    })
  }

  //search by jobtype
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

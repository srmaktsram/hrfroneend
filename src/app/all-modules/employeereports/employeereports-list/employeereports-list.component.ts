import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: 'app-employeereports-list',
  templateUrl: './employeereports-list.component.html',
  styleUrls: ['./employeereports-list.component.css']
})
export class EmployeereportsListComponent implements OnInit {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  // public lstUseralljobs: any[];
	public url: any = "employeereport";
	public tempId: any;
    public editId: any;
    public adminId:any;
    public lstEmployee;
       public rows = [];
       public dep=[];
  public srch = [];
  constructor(
  		private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private http :HttpClient,
    private toastr: ToastrService
  	) {
      this.adminId=sessionStorage.getItem("adminId")
      this.selecteDepartment();
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
  	this.LoadEmployee();
  }
     // Get department list  Api Call
  LoadEmployee() {
    this.http.get("http://localhost:8443/admin/allemployees/getallEmployee"+"/"+this.adminId).subscribe((data:any) => {
      this.lstEmployee = data;
    console.log(data)
      this.dtTrigger.next();
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
     
      });
  }
/////////searching between from and to/////////////////
  searchFromAndTo(startDate,endDate){
    this.rows.splice(0,this.rows.length)
    this.srch.map((item)=>{
      let currDate=item.createDate.split()
      if(startDate<=currDate[0] && currDate[0]<=endDate){
        this.rows.push(item);
      }
    })

  }
/////////////////Select department/////////////////////////
selecteDepartment(){
  this.http.get("http://localhost:8443/admin/department/getAdminData"+"/"+this.adminId).subscribe((data:any)=>{
    this.dep=data
    console.log("this is Dep",this.dep)
  })
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

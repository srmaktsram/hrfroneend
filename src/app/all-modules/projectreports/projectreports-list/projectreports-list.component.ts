import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-projectreports-list',
  templateUrl: './projectreports-list.component.html',
  styleUrls: ['./projectreports-list.component.css']
})
export class ProjectreportsListComponent implements OnInit {
	public url: any = "projectreports";
  public tempId: any;
  public editId: any;
  public lstProjectreports;
  public rows = [];
  public srch = [];
  public Allprojects=[];
  public adminId:any;
  constructor(
  	private formBuilder: FormBuilder,
    private http:HttpClient,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) {
      this.adminId=sessionStorage.getItem("adminId");
      this.projectName();
     }


  ngOnInit() {
  // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	this.LoadProjectreports();
  }
  // Get department list  Api Call
  LoadProjectreports() {
    this.http.get("http://localhost:8443/admin/projects/getAdminproject"+"/"+this.adminId).subscribe((data:any) => {
      this.lstProjectreports = data;
      this.rows = this.lstProjectreports;
      console.log( this.rows )
      this.srch = [...this.rows];
      });
  }

projectName(){
  this.http.get("http://localhost:8443/admin/projects/getAllproject").subscribe((data:any)=>{
    this.Allprojects=data;
   
  })

}

///////searching all fields////////////////

nameAndStatus(name,status){
  console.log("searching with name and status",name,status)
  this.rows.splice(0,this.rows.length);
  this.srch.map((item)=>{
    
    if(item.name===name && item.status===status){
      this.rows.push(item);
    }
  })

}


  //search by Status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

}

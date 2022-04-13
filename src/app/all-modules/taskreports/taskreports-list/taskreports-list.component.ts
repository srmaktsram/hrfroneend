import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: 'app-taskreports-list',
  templateUrl: './taskreports-list.component.html',
  styleUrls: ['./taskreports-list.component.css']
})
export class TaskreportsListComponent implements OnInit {
public url: any = "taskreports";
public adminId:any;
lstStudents
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
  	this.loadStudents(); 
  }
    // Get Students List  Api Call
  loadStudents() {
    this.http.get("http://localhost:8443/admin/report/tasks/getAdminTask"+"/"+this.adminId).subscribe((data:any) => {
      console.log(data)
      this.lstStudents = data;
     
    });
  }

}

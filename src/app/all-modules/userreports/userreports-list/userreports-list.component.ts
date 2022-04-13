import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllModulesService } from "../../all-modules.service";
declare const $: any;

@Component({
  selector: 'app-userreports-list',
  templateUrl: './userreports-list.component.html',
  styleUrls: ['./userreports-list.component.css']
})
export class UserreportsListComponent implements OnInit {
public url: any = "userreports";
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
    this.http.get("http://localhost:8443/admin/allemployees/getallEmployee"+"/"+this.adminId).subscribe((data:any) => {
      console.log(data)
      this.lstStudents = data;
     
    });
  }

}

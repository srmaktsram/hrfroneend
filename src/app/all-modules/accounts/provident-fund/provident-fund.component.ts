import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-provident-fund",
  templateUrl: "./provident-fund.component.html",
  styleUrls: ["./provident-fund.component.css"],
})
export class ProvidentFundComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public adminId=sessionStorage.getItem("adminId");
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "providentFund";
  public allProvidentfund: any = [];
  public addProvidentfund: FormGroup;
  public editProvidentForm: FormGroup;
  public editId: any;
  public tempId: any;
  employeeid: any;
  constructor(
    private allModuleService: AllModulesService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProvidentfund();

    // Add Provident Form Validation And Getting Values

    this.addProvidentfund = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editProvidentForm = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getProvidentfund() {
    this.http.get("http://localhost:8443/admin/provident/adminGetProvident"+"/"+this.adminId).subscribe((data:any) => {
      console.log("GET API",data)
      this.allProvidentfund = data;
      this.dtTrigger.next();
    });
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  // Add Provident Modal Api Call

  addProvident() {
    if(this.addProvidentfund.invalid){
      this.markFormGroupTouched(this.addProvidentfund)
      return
    }
    if (this.addProvidentfund.valid) {
      let obj = {
        adminId:this.adminId,
        employeeid:this.employeeid,
        employeeName: this.addProvidentfund.value.employeeName,
        providentFundType: this.addProvidentfund.value.providentType,
        employeeShare: this.addProvidentfund.value.employeeShare,
        organizationShare: this.addProvidentfund.value.organisationShare,
      };
      this.http.post("http://localhost:8443/admin/provident/createProvident",obj).subscribe((data:any) => {
        console.log("POST API",data)
        this.getProvidentfund();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
     
      $("#add_pf").modal("hide");
      this.addProvidentfund.reset();
      this.toastr.success("Provident fund is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editProvident() {
    let obj = {
      employeeName: this.editProvidentForm.value.employeeName,
      providentFundType: this.editProvidentForm.value.providentType,
      employeeShare: this.editProvidentForm.value.employeeShare,
      organizationShare: this.editProvidentForm.value.organisationShare,
      id: this.editId,
    };
    this.http.patch("http://localhost:8443/admin/provident/updateProvident"+"/"+this.editId,obj).subscribe((data1:any) => {
      console.log(data1)
      this.getProvidentfund();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    
    $("#edit_pf").modal("hide");
    this.toastr.success("Provident fund is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allProvidentfund.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allProvidentfund[index];
    this.editProvidentForm.setValue({
      employeeName: toSetValues.employeeName,
      providentType: toSetValues.providentFundType,
      employeeShare: toSetValues.employeeShare,
      organisationShare: toSetValues.organizationShare,
    });
  }

  // Delete Provident Modal Api Call

  deleteProvident() {
    this.http.patch("http://localhost:8443/admin/provident/deleteProvident"+"/"+this.tempId,{}).subscribe((data) => {
      console.log("DELETE API",data)
      this.getProvidentfund();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      
      $("#delete_pf").modal("hide");
      this.toastr.success("Tax is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

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
  selector: "app-taxes",
  templateUrl: "./taxes.component.html",
  styleUrls: ["./taxes.component.css"],
})
export class TaxesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "taxes";
  public allTaxes: any = [];
  public addTaxes: FormGroup;
  public editTaxForm: FormGroup;
  public editId: any;
  public tempId: any;
  public adminId=sessionStorage.getItem("adminId");
  public employeeid:any
  constructor(
    private allModuleService: AllModulesService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTaxes();
    // Add Taxes Form Validation And Getting Values

    this.addTaxes = this.formBuilder.group({
      taxName: ["", [Validators.required]],
      taxpercentage: ["", [Validators.required]],
    });

    // Edit Taxes Form Validation And Getting Values

    this.editTaxForm = this.formBuilder.group({
      editTaxName: ["", [Validators.required]],
      editTaxPercentage: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getTaxes() {
    this.http.get("http://localhost:8443/admin/taxes/adminGetTaxes"+"/"+this.adminId).subscribe((data:any) => {
      console.log("GET API",data)
      this.allTaxes = data;
      
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

  // Add Taxes Modal Api Call

  addTaxSubmit() {
    if(this.addTaxes.invalid){
      this.markFormGroupTouched(this.addTaxes)
      return
    }
    if (this.addTaxes.valid) {
      let obj = {
        adminId:this.adminId,
        employeeid:this.employeeid,
        taxName: this.addTaxes.value.taxName,
        taxPercentage: this.addTaxes.value.taxpercentage,
      };
      this.http.post("http://localhost:8443/admin/taxes/createTaxes",obj).subscribe((data:any) => {
        console.log("POST API",data)
        this.getTaxes();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
     
      $("#add_tax").modal("hide");
      this.addTaxes.reset();
      this.toastr.success("Tax is added", "Success");
    }
  }

  // update status function..........
  updateStatus(val,id){
    
    this.http.patch("http://localhost:8443/admin/taxes/updateTaxes"+"/"+id,{status:val}).subscribe((data:any)=>{
      console.log(data);
      this.getTaxes();
    })
  }

  // Edit Taxes Modal Api Call

  editTaxSubmit() {
    let obj = {
      taxName: this.editTaxForm.value.editTaxName,
      taxPercentage: this.editTaxForm.value.editTaxPercentage,
      
    };
    this.http.patch("http://localhost:8443/admin/taxes/updateTaxes"+"/"+this.editId,obj).subscribe((data1:any) => {
      console.log("PATCH API",data1)
      this.getTaxes();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
  
    $("#edit_tax").modal("hide");
    this.toastr.success("Tax is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allTaxes.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allTaxes[index];
    this.editTaxForm.setValue({
      editTaxName: toSetValues.taxName,
      editTaxPercentage: toSetValues.taxPercentage,
    });
  }

  // Delete Taxes Modal Api Call

  deleteTaxes() {
    this.http.patch("http://localhost:8443/admin/taxes/deleteTaxes"+"/"+ this.tempId,{}).subscribe((data:any) => {
      console.log("DELETE API",data)
      this.getTaxes();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    
      $("#delete_tax").modal("hide");
      this.toastr.success("Tax is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

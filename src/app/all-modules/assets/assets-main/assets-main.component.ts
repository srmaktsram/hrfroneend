import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
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
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-assets-main",
  templateUrl: "./assets-main.component.html",
  styleUrls: ["./assets-main.component.css"],
})
export class AssetsMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "assets";
  public allAssets: any = [];
  public addAssets: FormGroup;
  public editAssets: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public adminId:any;
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;
  constructor(
    private allModuleService: AllModulesService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.adminId=sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    // for floating label

    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    // get assets data from API

    this.getAssets();

    // Add Assets Form Validation And Getting Values

    this.addAssets = this.formBuilder.group({
      assetName: ["", [Validators.required]],
      assetId: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchaseTo: ["", [Validators.required]],
      warranty: ["", [Validators.required]],
      value: ["", [Validators.required]],
      assetUser: ["", [Validators.required]],
      assetStatus: ["", [Validators.required]],
      description:["", ],
      manufacturer:["", ],
      model:["", ], 
      serialNumber:["", ], 
      supplier:["", ], 
      condition:["", ],
    });

    // Edit Assets Form Validation And Getting Values

    this.editAssets = this.formBuilder.group({
      editAssetsName: ["", [Validators.required]],
      editPurchaseDate: ["", [Validators.required]],
      editPurchaseTo: ["", [Validators.required]],
      editWarranty: ["", [Validators.required]],
      editvalue: ["", [Validators.required]],
      editAssetUser: ["", [Validators.required]],
      editAssetId: ["", [Validators.required]],
      editAssetStatus: ["", [Validators.required]],
      editdescription:["", ],
      editmanufacturer:["", ],
      editmodel:["", ], 
      editserialNumber:["", ], 
      editsupplier:["", ], 
      editcondition:["", ],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.allAssets = [];
    this.getAssets();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //get data for data table
  getAssets() {
    this.http.get("http://localhost:8443/admin/assets/getAdminAssets"+"/"+this.adminId).subscribe((data:any) => {
      // console.log("get Assets>>>>>>>>>>>>>",data)
      this.allAssets = data;
      this.rows = this.allAssets;
      this.srch = [...this.rows];
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

  // Add Assets Modal Api Call
  addAssetsSubmit() {
    if(this.addAssets.invalid){
      this.markFormGroupTouched(this.addAssets)
      return
    }
    if (this.addAssets.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseTo,
        "dd-MM-yyyy"
      );
      let obj = {
        adminId:this.adminId,
        assetName: this.addAssets.value.assetName,
        assetId: this.addAssets.value.assetId,
        purchaseDate: purchaseDateFormat,
        warrenty: this.addAssets.value.warranty,
        Amount: this.addAssets.value.value,
        assetUser: this.addAssets.value.assetUser,
        warrentyEnd: purchaseToDateFormat,
        assetStatus: this.addAssets.value.assetStatus,
        description: this.addAssets.value.description,
        manufacturer: this.addAssets.value.manufacturer,
        model: this.addAssets.value.model,
        serialNumber: this.addAssets.value.serialNumber,
        supplier: this.addAssets.value.supplier,
        condition: this.addAssets.value.condition
      };

      this.http.post("http://localhost:8443/admin/assets/createAssets",obj).subscribe((data:any) => {
      //   console.log("post Assets>>>>>>>>>>>>>",obj)
      // console.log("post Assets>>>>>>>>>>>>>",data)

        this.getAssets();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
    
      $("#add_asset").modal("hide");
      this.addAssets.reset();
      this.toastr.success("Assets is added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editPurchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Assets Modal Api Call
  editAssetSubmit() {
    if (this.editAssets.valid) {
      let obj = {
        assetName: this.editAssets.value.editAssetsName,
        assetId: this.editAssets.value.editAssetId,
        purchaseDate: this.editPurchaseDateFormat,
        warrenty: this.editAssets.value.editWarranty,
        Amount: this.editAssets.value.editvalue,
        assetUser: this.editAssets.value.editAssetUser,
        warrentyEnd: this.editPurchaseToDateFormat,
        assetStatus: this.editAssets.value.editAssetStatus,
        description: this.editAssets.value.editdescription,
        manufacturer: this.editAssets.value.editmanufacturer,
        model: this.editAssets.value.editmodel,
        serialNumber: this.editAssets.value.editserialNumber,
        supplier: this.editAssets.value.editsupplier,
        condition: this.editAssets.value.editcondition,
       
      };
      alert(this.editId)
      this.http.patch("http://localhost:8443/admin/assets/updateAssets"+"/"+this.editId,obj).subscribe((data:any) => {
      // console.log("update Assets>>>>>>>>>>>>>",obj)
      // console.log("update Assets>>>>>>>>>>>>>",data)
      this.getAssets();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
    
      $("#edit_asset").modal("hide");
      this.toastr.success("Assets is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // for set values to editassets form
  edit(value) {
    
    this.editId = value;
   
    const index = this.allAssets.findIndex((item) => {
      return item.assetId === value;
    
    });
   
    let toSetValues = this.allAssets[index];
   

    
    this.editAssets.patchValue({
      editAssetsName: toSetValues.assetName,
      editPurchaseDate: toSetValues.purchaseDate,
      editPurchaseTo: toSetValues.warrentyEnd,
      editWarranty: toSetValues.warrenty,
      editvalue: toSetValues.Amount,
      editAssetUser: toSetValues.assetUser,
      editAssetId: toSetValues.assetId,
      editAssetStatus: toSetValues.assetStatus,
      editdescription: toSetValues.description,
      editmanufacturer: toSetValues.manufacturer,
      editmodel:toSetValues.model,
      editserialNumber:toSetValues.serialNumber,
      editsupplier:toSetValues.supplier,
      editcondition:toSetValues.condition,

    });
  }

  // Delete Assets Modal Api Call
  deleteAssets() {
    this.http.patch("http://localhost:8443/admin/assets/deleteAssets"+"/"+this.tempId,{assetStatus:2}).subscribe((data:any) => {
      // console.log("delete Assets>>>>>>>>>>>>>",this.tempId)
      this.getAssets();
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
   
    $("#delete_asset").modal("hide");
    this.toastr.success("Assets is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetUser.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase

  searchByPurchase(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.purchaseDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchByWarranty(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.warrentyEnd.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }



  /////search   by fropm and to////////////
  searchFromAndTo(startDate,endDate){
    this.rows.splice(0,this.rows.length);
    this.srch.map((item)=>{
      // console.log(item.createDate)
      if(startDate<=item.createDate && item.createDate<=endDate){
        this.rows.push(item);
      }
    })
  }

  //getting the status value
  getStatus(data,id) {
       
     this.http.patch("http://localhost:8443/admin/assets/updateAssets"+"/"+id,{assetStatus:data}).subscribe((data:any) => {
     
      this.getAssets();
  })
  }
  //for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

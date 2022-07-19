import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-promocodes-list",
  templateUrl: "./promocodes-list.component.html",
  styleUrls: ["./promocodes-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  addPackageForm: FormGroup;
  editPackageForm: FormGroup;
  public tempId: any;
  public adminId: any;
  public companiesList = [];

  public data = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  editId: any;

  filtereddata = [];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;
  editFromDate: string;
  editTillDate: string;
  user_type: string;
  promocodewrite: string;

  constructor(
    // private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.promocodewrite = sessionStorage.getItem("promocodewrite");
  }

  ngOnInit() {
    // this.getCompanyName()
    this.getPackages();

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //Add clients form
    this.addPackageForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      code: ["", [Validators.required]],
      codeValue: ["", [Validators.required]],
      validFrom: ["", [Validators.required]],
      validTill: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editPackageForm = this.formBuilder.group({
      editname: ["", [Validators.required]],
      editcode: ["", [Validators.required]],
      editcodeValue: ["", [Validators.required]],
      editvalidFrom: ["", [Validators.required]],
      editvalidTill: ["", [Validators.required]],
      editstatus: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get all Clients data
  public getPackages() {
    this.http
      .get("http://localhost:8443/mainadmin/promocode/getPackages")
      .subscribe((res: any[]) => {
        this.data = res;
        this.filtereddata = res;
        this.srch = [...this.data];
      });
  }

  //reset form

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Edit client
  public onEditClient(id: any) {
    this.editId = id;
    let pkg = this.data.filter((item) => item.id == id);
    this.editPackageForm.patchValue({
      editname: pkg[0]?.name,
      editcode: pkg[0]?.code,
      editcodeValue: pkg[0]?.codeValue,
      editvalidFrom: pkg[0]?.validFrom,
      editvalidTill: pkg[0]?.validTill,
      editstatus: pkg[0]?.status,
    });
  }
  //Reset form
  public resetForm() {
    this.addPackageForm.reset();
  }

  // Save Client
  public onSave() {
    if (this.editPackageForm.invalid) {
      this.markFormGroupTouched(this.editPackageForm);
      return;
    }
    let editFromDate = this.pipe.transform(
      this.addPackageForm.value.validFrom,
      "dd-MM-yyyy"
    );
    let editTillDate = this.pipe.transform(
      this.addPackageForm.value.validTill,
      "dd-MM-yyyy"
    );
    let obj = {
      editname: this.editPackageForm.value.editname,
      editcode: this.editPackageForm.value.editcode,
      editcodeValue: this.editPackageForm.value.editcodeValue,
      editvalidFrom: editFromDate,
      editvalidTill: editTillDate,
      status: this.editPackageForm.value.editstatus,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/promocode/updatePackage" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getPackages();
      });

    $("#edit_client").modal("hide");
    this.editPackageForm.reset();
    this._snackBar.open("Package updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Add new client
  public onAddPackage() {
    if (this.addPackageForm.invalid) {
      this.markFormGroupTouched(this.addPackageForm);
      return;
    }
    let editFromDate = this.pipe.transform(
      this.addPackageForm.value.validFrom,
      "dd-MM-yyyy"
    );
    let editTillDate = this.pipe.transform(
      this.addPackageForm.value.validTill,
      "dd-MM-yyyy"
    );
    let obj = {
      name: this.addPackageForm.value.name,
      code: this.addPackageForm.value.code,
      codeValue: this.addPackageForm.value.codeValue,
      validFrom: editFromDate,
      validTill: editTillDate,
      status: this.addPackageForm.value.status,
    };
    this.http
      .post("http://localhost:8443/mainadmin/promocode/createPackage", obj)
      .subscribe((data) => {
        this.getPackages();
      });

    $("#add_client").modal("hide");
    this.addPackageForm.reset();
    this._snackBar.open("Offer Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Delete Client
  onDelete() {
    // this.allModulesService.delete(this.tempId, "clients").subscribe((data) => {
    let id = this.tempId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/promocode/deletePackage" + "/" + id,
        {}
      )
      .subscribe((data: any) => {
        this.getPackages();
      });

    $("#delete_client").modal("hide");
    this._snackBar.open("Offer Deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //search by name
  searchID(val) {
    if (val) {
      this.data.splice(0, this.filtereddata.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();

        return (
          d.name.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.code.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });

      this.data.push(...temp);
    } else {
      this.getPackages();
    }
  }
  //date

  //getting the status value
  getStatus(val, id) {
    let obj = {
      status: val,
    };
    this.http
      .patch(
        "http://localhost:8443/mainadmin/promocode/UpdateStatus" + "/" + id,
        obj
      )
      .subscribe((data: any) => {
        this.getPackages();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

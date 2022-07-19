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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-policies-content",
  templateUrl: "./policies-content.component.html",
  styleUrls: ["./policies-content.component.css"],
})
export class PoliciesContentComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "policies";
  public allPolicies: any = [];
  public addPolicies: FormGroup;
  public editPolicies: FormGroup;
  public editId: any;
  public tempId: any;
  public adminId: any;
  user_type: string;
  policieswriteRecep: string;
  policieswriteHr: string;
  policiesWritefin: string;
  policiesWriteMan: string;
  policiesWrite: string;
  policiesWriteSub: string;
  constructor(
    private allModuleService: AllModulesService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.policiesWrite = sessionStorage.getItem("policiesWrite");
    this.policiesWriteSub = sessionStorage.getItem("policiesWriteSub");
    this.policiesWriteMan = sessionStorage.getItem("policiesWriteMan");
    this.policiesWritefin = sessionStorage.getItem("policiesWritefin");

    this.policieswriteRecep = sessionStorage.getItem("policieswriteRecep");
    this.policieswriteHr = sessionStorage.getItem("policieswriteHr");
  }

  ngOnInit() {
    this.getPolicies();

    // Add Provident Form Validation And Getting Values

    this.addPolicies = this.formBuilder.group({
      addPolicyName: ["", [Validators.required]],
      addDepartment: ["", [Validators.required]],
      addDescription: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editPolicies = this.formBuilder.group({
      editPolicyName: ["", [Validators.required]],
      editDepartment: ["", [Validators.required]],
      editDescription: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getPolicies() {
    this.http
      .get(
        "http://localhost:8443/admin/policies/getAdminPolicies" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.allPolicies = data;
        console.log("GET API", this.allPolicies);
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

  addPoliciesSubmit() {
    if (this.addPolicies.invalid) {
      this.markFormGroupTouched(this.addPolicies);
      return;
    }
    if (this.addPolicies.valid) {
      let obj = {
        adminId: this.adminId,
        policyName: this.addPolicies.value.addPolicyName,
        department: this.addPolicies.value.addDepartment,
        description: this.addPolicies.value.addDescription,
      };
      this.http
        .post("http://localhost:8443/admin/policies/createPolicy", obj)
        .subscribe((data: any) => {
          this.allPolicies = data;
          console.log("POST API", this.allPolicies);
          this.getPolicies();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
        });
      // this.getPolicies();
      $("#add_policy").modal("hide");
      this.addPolicies.reset();

      this._snackBar.open("Policy Added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // Edit Provident Modal Api Call

  editPoliciesSubmit() {
    let obj = {
      policyName: this.editPolicies.value.editPolicyName,
      department: this.editPolicies.value.editDepartment,
      description: this.editPolicies.value.editDescription,
      createdDate: this.editPolicies.value.createdDate,
      id: this.editId,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/policies/updatePolicy" + "/" + this.editId,
        obj
      )
      .subscribe((data1: any) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        console.log("UPDATE API", data1);
      });
    this.getPolicies();
    $("#edit_policy").modal("hide");

    this._snackBar.open("Policy updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  edit(value) {
    this.editId = value;
    const index = this.allPolicies.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allPolicies[index];
    this.editPolicies.patchValue({
      editPolicyName: toSetValues.policyName,
      editDepartment: toSetValues.department,
      editDescription: toSetValues.description,
    });
  }

  // Delete Provident Modal Api Call

  deletePolicies() {
    this.http
      .patch(
        "http://localhost:8443/admin/policies/deletePolicy" + "/" + this.tempId,
        {}
      )
      .subscribe((data: any) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        console.log("DELETE API", data);
        this.getPolicies();
        $("#delete_policy").modal("hide");

        this._snackBar.open("Policy deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

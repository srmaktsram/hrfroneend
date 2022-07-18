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
  selector: "app-pending-kyc-list",
  templateUrl: "./pending-kyc-list.component.html",
  styleUrls: ["./pending-kyc-list.component.css"],
})
export class PendingKycListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  public addClientForm: FormGroup;
  public editClientForm: FormGroup;
  public tempId: any;
  public adminId: any;
  public companiesList = [];

  public data = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  editId: any;
  id: any;

  invoices: any;
  projects: any;
  tasks: any;
  chats: any;
  estimates: any;
  timingSheets: any;
  companys: any[];
  filtereddata: any[];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;
  pendingData: any;
  addRejectForm: FormGroup;
  aadhaarPath: any;
  aadhaarCardPath: string;
  panCardPath: string;
  panPath: any;
  aadhaarCardBackPath: string;
  user_type: string;
  kycwrite: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.kycwrite = sessionStorage.getItem("kycwrite");
  }

  ngOnInit() {
    this.getPendingKyc();

    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
    this.addRejectForm = this.formBuilder.group({
      addRemark: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  public getPendingKyc() {
    this.http
      .get("http://localhost:8443/affiliates/kyc/getPendingKyc")
      .subscribe((res: any) => {
        this.pendingData = res;
      });
  }
  setCuurentDetailsPan(id, panCard) {
    this.id = id;
    this.panCardPath = `http://localhost:8443/${panCard}`;
  }
  setCuurentDetailsAadhar(id, aadhaarCard, aadhaarCardBack) {
    this.id = id;
    this.aadhaarCardPath = `http://localhost:8443/${aadhaarCard}`;

    this.aadhaarCardBackPath = `http://localhost:8443/${aadhaarCardBack}`;
  }

  getPanApprove() {
    let obj = {
      panVerified: "2",
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/kyc/updatePanApprove" + "/" + this.id,
        obj
      )
      .subscribe((res) => {
        this.getPendingKyc();
      });
    $("#viewPanButton").modal("hide");
    this._snackBar.open("Approved Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  getPanReject() {
    let obj = {
      panVerified: "3",
      panRemark: this.addRejectForm.value.addRemark,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/kyc/updatePanReject" + "/" + this.id,
        obj
      )
      .subscribe((res: any) => {
        this.getPendingKyc();
      });
    $("#add_reject").modal("hide");
    this._snackBar.open("Reject request Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /////////////////////////////////

  getAadhaarApprove() {
    let obj = {
      aadhaarVerified: "2",
      aadhaarBackVerified: "2",
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/kyc/updateAadhaarApprove" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res) => {
        this.getPendingKyc();
      });
    $("#viewAadhaarButton").modal("hide");
    this._snackBar.open("Approved Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  getAadhaarReject() {
    let obj = {
      aadhaarVerified: "3",
      aadhaarBackVerified: "3",
      aadhaarRemark: this.addRejectForm.value.addRemark,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/kyc/updateAadhaarReject" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res: any) => {
        this.getPendingKyc();
      });
    $("#add_reject_aadhaar").modal("hide");
    this._snackBar.open("Reject request Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

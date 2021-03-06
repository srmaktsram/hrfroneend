import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-commission-list",
  templateUrl: "./commission-list.component.html",
  styleUrls: ["./commission-list.component.css"],
})
export class CommissionListComponent implements OnInit, OnDestroy {
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
  public id: any;
  commissionData: any;
  newStatus: any;
  newData: any;
  newAmount: any;
  user_type: string;
  commissionswrite: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.commissionswrite = sessionStorage.getItem("commissionswrite");
  }

  ngOnInit() {
    this.getCommisions();

    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get all Clients data
  public getCommisions() {
    this.http
      .get("http://localhost:8443/affiliates/commisions/getCommisions")
      .subscribe((res: any) => {
        this.data = res;
      });
  }
  //////////////

  getApproveStatus() {
    let obj = {
      status: "2",
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/commisions/updateCommissionStatus" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res: any) => {
        this.getCommisions();
        this.commissionData = res.data;
        this.newStatus = res.data.status;

        if (this.newStatus == 2) {
          let obj = {
            aId: this.commissionData.aId,
            amount: this.commissionData.amount,
            package_name: this.commissionData.packageName,
            status: this.commissionData.status,
            createDate: this.commissionData.createDate,
            updateDate: this.commissionData.updateDate,
            renewStatus: this.commissionData.renewStatus,
          };
          this.http
            .post(
              "http://localhost:8443/affiliates/affiliteWalletDetails/createAffiliteWalletDetails",
              obj
            )
            .subscribe((res: any) => {
              this.newData = res.result;
              if (res.data.renewStatus == "0") {
                this.newAmount = (parseFloat(res.data.amount) * 30) / 100;
              } else if (res.data.renewStatus == "1") {
                this.newAmount = (parseFloat(res.data.amount) * 10) / 100;
              }
              if (this.newData == 1) {
                let object = {
                  current_balance: parseFloat(this.newAmount),
                };
                this.http
                  .patch(
                    "http://localhost:8443/affiliates/wallet/updateWallet" +
                      "/" +
                      this.commissionData.aId,
                    object
                  )
                  .subscribe((res: any) => {});
              }
            });
        }
      });
    $("#delete_pay").modal("hide");

    this._snackBar.open("Added As Paid sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ///////////////////////////
  getRejectStatus() {
    let obj = {
      status: "3",
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/commisions/updateCommissionStatus" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res) => {
        this.getCommisions();
      });
    $("#add_reject").modal("hide");

    this._snackBar.open("Marked As Rejected sucessfully !", "", {
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

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
  selector: "app-pending-request-list",
  templateUrl: "./pending-request-list.component.html",
  styleUrls: ["./pending-request-list.component.css"],
})
export class WithdrwalRequestComponent implements OnInit, OnDestroy {
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
  addRejectForm: FormGroup;
  actualAmount: any;
  newAmount: number;
  newData: any;
  id: any;
  withdrawalrequestwrite: string;
  user_type: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.withdrawalrequestwrite = sessionStorage.getItem(
      "withdrawalrequestwrite"
    );
  }

  ngOnInit() {
    this.getPaymentRequest();

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

  public getPaymentRequest() {
    this.http
      .get("http://localhost:8443/affiliates/affiliate/getPaymentRequest")
      .subscribe((res: any) => {
        this.data = res;
        this.srch = [...this.data];
      });
  }

  getPay() {
    this.newAmount = this.actualAmount - this.actualAmount * 0.1;
    let obj = {
      status: "1",
      withdrawAmount: this.newAmount,
      approveRemark: "Completed",
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/affiliate/updatePaymentRequestPay" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res: any) => {
        this.getPaymentRequest();
        if (res.result == 1) {
          let object = {
            withdraw: res.data.amount,
          };
          this.http
            .patch(
              "http://localhost:8443/affiliates/wallet/updateWalletPaidAmount" +
                "/" +
                res.data.aId,
              object
            )
            .subscribe((res: any) => {});
        }
        ////
        if (res.result == 1) {
          let obj = {
            aId: res.data.aId,
            amount: res.data.amount,
            package_name: "Type:- Withdrawal",
            status: res.data.status,
            createDate: res.data.createDate,
            updateDate: res.data.updateDate,
          };
          this.http
            .post(
              "http://localhost:8443/affiliates/affiliteWalletDetails/createAffiliteWalletDetails",
              obj
            )
            .subscribe((res: any) => {});
        }
      });
    $("#delete_pay").modal("hide");

    this._snackBar.open("Pay Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getReject() {
    let obj = {
      status: "2",
      remark: this.addRejectForm.value.addRemark,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/affiliate/updatePaymentRequestReject" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res: any) => {
        if (res.result == 1) {
          let object = {
            reject: res.data.amount,
          };
          this.http
            .patch(
              "http://localhost:8443/affiliates/wallet/updateWalletRejectAmount" +
                "/" +
                res.data.aId,
              object
            )
            .subscribe((res: any) => {});
        }
        this.getPaymentRequest();
      });
    $("#add_holiday").modal("hide");

    this._snackBar.open("Reject request Added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //search by name
  search(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return (
          d.email.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.aId.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.phone.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });
      this.data.push(...temp);
    } else {
      this.getPaymentRequest();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

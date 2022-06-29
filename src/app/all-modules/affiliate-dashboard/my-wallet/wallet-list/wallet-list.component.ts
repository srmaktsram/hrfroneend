import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

declare const $: any;
@Component({
  selector: "app-wallet-list",
  templateUrl: "./wallet-list.component.html",
  styleUrls: ["./wallet-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  addPackageForm: FormGroup;
  editPackageForm: FormGroup;
  public tempId: any;
  public companiesList = [];
  public actualAmount: any;
  public withdrawalAmount: any;
  public newAmount: any;
  insufficientBalance = true;
  newStatus = true;
  minApprovalAmount = true;
  pendingAlready = true;
  public affilateId: any;
  public bankdetails: any;
  public email: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public aId: any;
  public kycStatus: string;

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
  currentBalance: any;
  totalBalance: any;
  pendingWithdraw: any;
  totalWithdraw: any;
  addRejectForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.affilateId = sessionStorage.getItem("affiliateId");
    this.email = sessionStorage.getItem("email");
    this.first_name = sessionStorage.getItem("first_name");
    this.last_name = sessionStorage.getItem("last_name");
    this.phone = sessionStorage.getItem("phone");
    this.aId = sessionStorage.getItem("aId");

    if (sessionStorage.getItem("bankDetails") === "undefined") {
      this.router.navigate(["/layout/affiliates/settings/bank-setting"])
        } else {
      this.bankdetails = JSON.parse(sessionStorage.getItem("bankDetails"));

    }
  }

  ngOnInit() {
    this.getWallet();
    this.getKycDetails();

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
  getKycDetails() {
    this.http
      .get("http://localhost:8443/affiliates/kyc/getKyc" + "/" + this.aId)
      .subscribe((response: any) => {
        this.kycStatus = response.kycVerified;
      });
  }

  //Get all Clients data
  public getWallet() {
    let id = this.affilateId;

    this.http
      .get(
        "http://localhost:8443/affiliates/affiliate/getAffiliateWallet" +
          "/" +
          id
      )
      .subscribe((res: any) => {
        this.currentBalance = res.current_balance;
        this.totalBalance = res.total_balance;
        this.pendingWithdraw = res.pending_withdraw;
        this.totalWithdraw = res.total_withdraw;
      });
  }

  requestAmount(val) {
    this.actualAmount = val;
    this.newAmount = this.actualAmount * 0.1;
    this.withdrawalAmount = this.actualAmount - this.newAmount;
  }

  public paymentRequest() {
    if (this.actualAmount > this.currentBalance) {
      this.insufficientBalance = false;
    }
    if (this.kycStatus != "3") {
      this.newStatus = false;
    } else {
      let obj = {
        id: this.affilateId,
        aId: this.aId,
        bankDetails: this.bankdetails,
        email: this.email,
        fullName: this.first_name + " " + this.last_name,
        phone: this.phone,
        amount: this.actualAmount,
      };
      this.http

        .post(
          "http://localhost:8443/affiliates/affiliate/createPaymentRequest",
          obj
        )
        .subscribe((res: any) => {
          if (res.result == 1) {
            let object = {
              pendingWithdraw: res.data.amount,
            };
            this.http
              .patch(
                "http://localhost:8443/affiliates/wallet/updateWalletRequestAmount" +
                  "/" +
                  this.aId,
                object
              )
              .subscribe((res: any) => {
                this.getWallet();
              });
          }
          if (res.result == 3) {
            this.minApprovalAmount = false;
          }
          if (res.result == 0) {
            this.pendingAlready = false;
          }
        });
    }
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

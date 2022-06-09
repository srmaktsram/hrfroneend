import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
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
  public actualAmount:any
  public withdrawalAmount:any
  public newAmount:any


  public affilateId:any
  public bankdetails:any
  public email:string
  public first_name:string
  public last_name:string
  public phone:string
  public aId:any

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
    private formBuilder: FormBuilder
  ) {
    this.affilateId=sessionStorage.getItem("affilateId")
    this.email=sessionStorage.getItem("email")
    this.first_name=sessionStorage.getItem("first_name")
    this.last_name=sessionStorage.getItem("last_name")
    this.phone=sessionStorage.getItem("phone")
    this.aId=sessionStorage.getItem("aId")
     this.bankdetails = 
    JSON.parse(sessionStorage.getItem("bankDetails"));
    console.log(sessionStorage.getItem("bankDetails"),"bankDetails ")
  }

  ngOnInit() {
    this.getWallet();

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
  public getWallet() {
    let id=this.affilateId
    
    this.http
      .get("http://localhost:8443/affiliates/affiliate/getAffiliateWallet"+"/"+id)
      .subscribe((res: any) => {
        this.currentBalance=res.current_balance
        this.totalBalance=res.total_balance
        this.pendingWithdraw=res.pending_withdraw
        this.totalWithdraw=res.total_withdraw
        console.log(res, "Get Wallet");
      });
  }

  requestAmount(val) {

    
      this.actualAmount = val;
      this.newAmount = this.actualAmount * 0.1
      this.withdrawalAmount=this.actualAmount-this.newAmount
  
  }

  public paymentRequest(){
    let obj = {
      id:this.affilateId,
      aId:this.aId,
      bankDetails:this.bankdetails,
      email:this.email,
      fullName:this.first_name+" "+this.last_name,
      phone:this.phone,
      amount:this.actualAmount
    };
    this.http

      .post(
        "http://localhost:8443/affiliates/affiliate/createPaymentRequest" ,obj
      )
      .subscribe((res: any) => {
        console.log(res, "abc");
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
  

 

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

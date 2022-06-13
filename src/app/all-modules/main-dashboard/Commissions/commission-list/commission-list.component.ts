import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";

declare const $: any;
@Component({
  selector: "app-commission-list",
  templateUrl: "./commission-list.component.html",
  styleUrls: ["./commission-list.component.css"],
})
export class CommissionListComponent implements OnInit, OnDestroy {
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
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
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
        console.log(res,"get Commisions")
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
      .subscribe((res:any) => {
        console.log(res, "updateStatus");
        this.getCommisions();
        this.commissionData=res.data
        console.log(this.commissionData,"Commm data")
        this.newStatus=res.data.status
        console.log( this.newStatus,"lllll")
         
          if (this.newStatus == 2) {
            
            let obj = {
              aId:this.commissionData.aId,
              amount:this.commissionData.amount,
              package_name:this.commissionData.packageName,
              status:this.commissionData.status,
              createDate:this.commissionData.createDate,
              updateDate:this.commissionData.updateDate,

            };
            this.http
              .post(
                "http://localhost:8443/affiliates/affiliteWalletDetails/createAffiliteWalletDetails",
                obj
              )
              .subscribe((res: any) => {
                console.log(res, "Created");
                this.newData=res.result
                this.newAmount=res.data.amount
                console.log(this.newAmount,"New Amount")
                console.log(this.newData)
                if(this.newData==1){
                  let object={
                    current_balance:this.commissionData.amount
                  }
                  this.http.patch("http://localhost:8443/affiliates/wallet/updateWallet"+"/"+this.commissionData.aId,object).subscribe((res:any)=>{
                    console.group(res,"wallet Updated")
                  })
                }
              });
          }
      });
    $("#delete_pay").modal("hide");
    this.toastr.success("Added As Paid", "Success");
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
      console.log(res, "updateRejectStatus");
      this.getCommisions();
    });
  $("#add_reject").modal("hide");
  this.toastr.success("Marked As Rejected", "Success");
}



   ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}


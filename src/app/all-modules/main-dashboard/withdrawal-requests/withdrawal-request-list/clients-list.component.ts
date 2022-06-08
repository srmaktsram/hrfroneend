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
export class WithdrwalRequestComponent implements OnInit, OnDestroy {
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
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
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
        console.log(res, "Hello Requests");
        this.data = res;
        this.srch = [...this.data];
       
      });
  }

  getPay() {
    this.newAmount = this.actualAmount - this.actualAmount * 0.1;
    let obj = {
      status: "1",
      withdrawAmount: this.newAmount,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/affiliate/updatePaymentRequestPay" +
          "/" +
          this.id,
        obj
      )
      .subscribe((res) => {
        console.log(res, "updatePay");
        this.getPaymentRequest();
      });
    $("#delete_pay").modal("hide");
    this.toastr.success("Pay Added", "Success");
  }

  getReject() {
    alert(this.id);
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
      .subscribe((res) => {
        console.log(res, "updateReject");
        this.getPaymentRequest();
      });
    $("#add_holiday").modal("hide");
    this.toastr.success("Reject request Added", "Success");
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

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-withdrawal-history-list",
  templateUrl: "./withdrawal-history-list.component.html",
  styleUrls: ["./withdrawal-history-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
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
  companys: any[];
  filtereddata: any[];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;
  dataArray: any;
  newData: any;
  dataNew: any;

  newId: any;
  dashboard: any;
  premiumClients: any;
  freeClients: any;
  visitorClients: any;
  tickets: any;
  invoices: any;
  orders: any;
  searchUser: any;
  searchMobile: any;
  searchEmail: any;
  aId: string;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.aId = sessionStorage.getItem("aId");

  }
  ngOnInit() {
    this.getWithdrawalHistory();

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
  public getWithdrawalHistory() {
    this.http
      .get("http://localhost:8443/affiliates/affiliate/getWithdrawalHistory"+"/"+this.aId)
      .subscribe((res: any) => {
        this.data = res;
        
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

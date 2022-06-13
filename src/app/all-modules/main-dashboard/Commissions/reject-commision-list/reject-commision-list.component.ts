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
  selector: "app-reject-commision-list",
  templateUrl: "./reject-commision-list.component.html",
  styleUrls: ["./reject-commision-list.component.css"],
})
export class RejectCommissionListComponent implements OnInit, OnDestroy {
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
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.getRejectedCommisions();

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
  public getRejectedCommisions() {
    this.http
      .get("http://localhost:8443/affiliates/Commisions/getRejectCommisions")
      .subscribe((res: any) => {
        console.log(res,"get Reject Commisions")
        this.data = res;
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

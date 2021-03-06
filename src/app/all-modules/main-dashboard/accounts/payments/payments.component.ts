import { Component, OnDestroy, OnInit } from "@angular/core";
import { AllModulesService } from "../../../all-modules.service";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"],
})
export class PaymentsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  public adminId = sessionStorage.getItem("adminId");
  public allPayments: any = [];
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private allModuleService: AllModulesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    //get payments
    this.getPayments();

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // get payment API call
  getPayments() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/paymentsMainAdmin/getPayments"
      )
      .subscribe((data: any) => {
        this.allPayments = data;

      });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

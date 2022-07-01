import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: "app-scheduletiming-list",
  templateUrl: "./scheduletiming-list.component.html",
  styleUrls: ["./scheduletiming-list.component.css"],
})
export class ScheduletimingListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstFees = [];
  // public url: any = "scheduletiming";

  constructor(
    private srvModuleService: AllModulesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get Fees List  Api Call
  loadFees() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getScheduleInterview")
      .subscribe((data: any) => {
        this.lstFees = data;
        console.log(this.lstFees, "this.lstFees>>>>>>>");
        this.dtTrigger.next();
      });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

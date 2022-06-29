import {
  COMPILER_OPTIONS,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AllModulesService } from "../../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

declare const $: any;
@Component({
  selector: "app-tickets-content",
  templateUrl: "./tickets-content.component.html",
  styleUrls: ["./tickets-content.component.css"],
})
export class TicketsContentComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public url: any = "tickets";
  public allTickets: any = [];

  public addTicketForm: FormGroup;
  public editTicketForm: FormGroup;
  public editId: any;
  public tempId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editCreated: any;
  public editLastDate: any;
  dataarr: any;
  lstEmployee: any;
  data: Object;
  user_type: string;
  check: boolean;
  disableButton = true;
  adminId: string;
  employeeid: string;
  ticketsCount: any;
  newTickets = 0;
  countResolved = 0;
  countOpen = 0;
  countPending = 0;
  ticketswrite: string;

  constructor(
    private allModuleService: AllModulesService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");
    this.ticketswrite = sessionStorage.getItem("ticketswrite");
    this.loadEmployee();

    this.employeeid = sessionStorage.getItem("employee_login_id");
    if (this.user_type == "admin") {
      this.check = true;
    }
  }

  public loadEmployee() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.dataarr = data;

        this.srch = [...this.dataarr];
      });
  }
  ngOnInit() {
    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getTickets();
    this.getTicketsCount();

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

 
 
  getTickets() {
   
      this.http
        .get(
          "http://localhost:8443/mainadmin/supportTickets/getMainAdminAllTickets"
        )
        .subscribe((data) => {
          this.allTickets = data;
          this.rows = this.allTickets;
        this.srch = [...this.rows];
         
        });
    
  }
  getTicketsCount() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/supportTickets/getMainAdminTicketsCount"
      )
      .subscribe((res: any) => {
        this.newTickets = res.countNewTicket;
        this.countResolved = res.countResolved;
        this.countOpen = res.countOpen;
        this.countPending = res.countPending;
      });
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  
 
  //getting the status value
  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/supportTickets/updateTicketStatus" + "/" + id,
        { status }
      )
      .subscribe((res) => {
        this.getTickets();
        this.getTicketsCount();
      });
  }
  getPriority(data, id) {
    const priority = data;

    this.http
      .patch(
        "http://localhost:8443/admin/tickets/updateTicketPriority" + "/" + id,
        { priority }
      )
      .subscribe((res) => {
        this.getTickets();
      });
  }

  //search by name
  searchName(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return (
          d.ticketSubject.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.replyPhone.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.replyEmail.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.companyName.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
  }
 
  //search by status
  searchStatus(val) {
    if (val) {
      if (val == "Pending") {
        val = "Open";
        let val1 = "Reopened";
        let val2 = "OnHold";
        this.rows.splice(0, this.rows.length);
        let temp = this.srch.filter(function (d) {
          return (
            d.status.indexOf(val) !== -1 ||
            !val ||
            d.status.indexOf(val1) !== -1 ||
            !val1 ||
            d.status.indexOf(val2) !== -1 ||
            !val2
          );
        });
        this.rows.push(...temp);
      } else if (val == "Approved") {
        val = "InProgress";
        this.rows.splice(0, this.rows.length);
        let temp = this.srch.filter(function (d) {
          val = val;
          return d.status.indexOf(val) !== -1 || !val;
        });
        this.rows.push(...temp);
      } else if (val == "Returned") {
        val = "Cancelled";
        let val1 = "Closed";

        this.rows.splice(0, this.rows.length);
        let temp = this.srch.filter(function (d) {
          return (
            d.status.indexOf(val) !== -1 ||
            !val ||
            d.status.indexOf(val1) !== -1 ||
            !val1
          );
        });
        this.rows.push(...temp);
      }
    } else {
      this.getTickets();
    }
  }

  searchPriority(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.priority.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

import {
  COMPILER_OPTIONS,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
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

  constructor(
    private allModuleService: AllModulesService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");
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

    // Add Ticket Form Validation And Getting Values
    this.addTicketForm = this.formBuilder.group({
      ticketSubject: ["", [Validators.required]],
      ticketId: ["", [Validators.required]],
      assignStaff: ["", [Validators.required]],
      clientName: ["", [Validators.required]],
      PriorityName: ["", [Validators.required]],
      ccName: ["", [Validators.required]],
      AssignName: ["", [Validators.required]],
      addFlowers: ["", [Validators.required]],
      createdDate: [""],
      lastReply: [""],
    });

    // Edit Ticket Form Validation And Getting Values

    this.editTicketForm = this.formBuilder.group({
      editTicketSubject: ["", [Validators.required]],
      editTicketId: ["", [Validators.required]],
      editAssignStaff: ["", [Validators.required]],
      editClientName: ["", [Validators.required]],
      editPriorityName: ["", [Validators.required]],
      editccName: ["", [Validators.required]],
      editAssignName: ["", [Validators.required]],
      editaddFlowers: ["", [Validators.required]],
    });

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  // rerender(): void {
  //   $("#datatable").DataTable().clear();
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.destroy();
  //   });
  //   this.allTickets = [];
  //   this.getTickets();
  //   setTimeout(() => {
  //     this.dtTrigger.next();
  //   }, 1000);
  // }
  //////////////////////////////////
  getTicketsCount() {
    if (this.user_type == "employee") {
      this.http
        .get(
          "http://localhost:8443/admin/tickets/getEmpTicketsCount" +
            "/" +
            this.adminId +
            "/" +
            this.employeeid
        )
        .subscribe((res: any) => {
          this.newTickets = res.countNewTicket;
          this.countResolved = res.countResolved;
          this.countOpen = res.countOpen;
          this.countPending = res.countPending;
        });
    } else if (this.user_type == "admin") {
      this.http
        .get(
          "http://localhost:8443/admin/tickets/getTicketsCount" +
            "/" +
            this.adminId
        )
        .subscribe((res: any) => {
          this.newTickets = res.countNewTicket;
          this.countResolved = res.countResolved;
          this.countOpen = res.countOpen;
          this.countPending = res.countPending;
        });
    }
  }

  getTickets() {
    if (this.user_type == "employee") {
      this.http
        .get(
          "http://localhost:8443/admin/tickets/getAllTickets" +
            "/" +
            this.adminId +
            "/" +
            this.employeeid
        )
        .subscribe((data) => {
          this.allTickets = data;
          this.rows = this.allTickets;
          this.srch = [...this.rows];
        });
    } else if (this.user_type == "admin") {
      this.http
        .get(
          "http://localhost:8443/admin/tickets/getAdminAllTickets" +
            "/" +
            this.adminId
        )
        .subscribe((data) => {
          this.allTickets = data;
          this.rows = this.allTickets;
          this.srch = [...this.rows];
        });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Ticket Modal Api Call

  addTickets() {
    if (this.addTicketForm.invalid) {
      this.markFormGroupTouched(this.addTicketForm);
      return;
    }

    // let created = this.pipe.transform(
    //   "12-05-2020",
    //   "dd-MM-yyyy"
    // );
    // let lastDate = this.pipe.transform(
    //   "13-05-2020",
    //   "dd-MM-yyyy"
    // );
    let obj = {
      ticketSubject: this.addTicketForm.value.ticketSubject,
      ticketId: this.addTicketForm.value.ticketId,
      assignedStaff: this.addTicketForm.value.assignStaff,
      client: this.addTicketForm.value.clientName,
      cc: this.addTicketForm.value.ccName,
      priority: this.addTicketForm.value.PriorityName,
      assigne: this.addTicketForm.value.AssignName,
      addfollow: this.addTicketForm.value.addFlowers,
      adminId: sessionStorage.getItem("adminId"),
      employeeid: sessionStorage.getItem("employee_login_id"),
    };
    if (this.user_type == "employee") {
      this.http
        .post("http://localhost:8443/admin/tickets/createTickets", obj)
        .subscribe((data) => {
          this.getTickets();
          //   $("#datatable").DataTable().clear();
          //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //     dtInstance.destroy();
          //   });
          //   this.dtTrigger.next();
        });

      $("#add_ticket").modal("hide");
      this.addTicketForm.reset();
      this.toastr.success("Tickets added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Edit Ticket Modal Api Call

  editTicket() {
    let obj = {
      ticketSubject: this.editTicketForm.value.editTicketSubject,
      ticketId: this.editTicketForm.value.editTicketId,
      assignedStaff: this.editTicketForm.value.editAssignStaff,
      client: this.editTicketForm.value.editClientName,
      cc: this.editTicketForm.value.editccName,
      priority: this.editTicketForm.value.editPriorityName,
      assigne: this.editTicketForm.value.editAssignName,
      addfollow: this.editTicketForm.value.editaddFlowers,
      // createdDate: "05-09-2020",
      // lastReply: "06-09-2020",
      // status: "Approved",
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/admin/tickets/updateTickets" + "/" + id,
        obj
      )
      .subscribe((data) => {
        //  $("#datatable").DataTable().clear();
        //  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //    dtInstance.destroy();
        //  });
        //  this.dtTrigger.next();

        this.getTickets();
      });

    $("#edit_ticket").modal("hide");
    this.editTicketForm.reset();
    this.toastr.success("Ticket updated", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allTickets.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allTickets[index];
    this.editTicketForm.setValue({
      editTicketSubject: toSetValues.ticketSubject,
      editTicketId: toSetValues.ticketId,
      editAssignStaff: toSetValues.assignedStaff,
      editClientName: toSetValues.client,
      editPriorityName: toSetValues.priority,
      editccName: toSetValues.cc,
      editAssignName: toSetValues.assigne,
      editaddFlowers: toSetValues.addfollow,
    });
  }
  // Delete Ticket Modal Api Call
  deleteTicket() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/tickets/deleteTickets" + "/" + id,
        obj
      )
      .subscribe((data) => {
        //   $("#datatable").DataTable().clear();
        //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     dtInstance.destroy();
        //   });
        //   this.dtTrigger.next();
        // });
        this.getTickets();
      });
    $("#delete_ticket").modal("hide");
    this.toastr.success("Tickets deleted", "Success");
  }

  //search by name
  searchName(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.assignedStaff.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
  }
  getSearchData(val, val1) {
    if (val && val1) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        val1 = val1.toLowerCase();
        return (
          (d.createdDate.toLowerCase().indexOf(val) !== -1 || !val) &&
          (d.lastReply.toLowerCase().indexOf(val1) !== -1 || !val1)
        );
      });

      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
  }
  /////
  // searchName(val) {
  //   if (val) {
  //     this.rows.splice(0, this.rows.length);
  //     let temp = this.srch.filter(function (d) {
  //       val = val.toLowerCase();
  //       return d.assignedStaff.toLowerCase().indexOf(val) !== -1 || !val;
  //     });
  //     this.rows.push(...temp);
  //   } else {
  //     this.getTickets();
  //   }
  // }
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

  //search by purchase
  searchFrom(val, val1) {
    if (val && val1) {
      this.disableButton = false;
    }
    if (val) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.createdDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }

    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchTo(val, val1) {
    if (val && val1) {
      this.disableButton = false;
    }
    if (val && val1) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.lastReply.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //getting the status value
  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/admin/tickets/updateTicketStatus" + "/" + id,
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

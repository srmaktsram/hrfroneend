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
import { HttpClient, HttpParams } from "@angular/common/http";
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
  companyName: string;
  employeeid: string;
  ticketsCount: any;
  newTickets = 0;
  countResolved = 0;
  countOpen = 0;
  countPending = 0;
  public multImages = [];

  constructor(
    private allModuleService: AllModulesService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.adminId = sessionStorage.getItem("adminId");
    this.companyName = sessionStorage.getItem("companyName");

    // this.loadEmployee();

    this.employeeid = sessionStorage.getItem("employee_login_id");
    if (this.user_type == "admin") {
      this.check = true;
    }
  }

  // public loadEmployee() {
  //   this.http
  //     .get(
  //       "http://localhost:8443/admin/allemployees/getallEmployee" +
  //         "/" +
  //         this.adminId
  //     )
  //     .subscribe((data: any) => {
  //       this.dataarr = data;

  //       this.srch = [...this.dataarr];
  //     });
  // }
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
      addticketSubject: ["", [Validators.required]],
      addPriorityName: ["", [Validators.required]],
      addReplyPhone: ["", [Validators.required]],
      addReplyEmail: ["", [Validators.required]],
      addDescription: [""],
      // addUploadFiles: [""],
      createdDate: [""],
      lastReply: [""],
    });

    // Edit Ticket Form Validation And Getting Values

    this.editTicketForm = this.formBuilder.group({
      editTicketSubject: ["", [Validators.required]],
      editPriorityName: ["", [Validators.required]],
      editReplyPhone: ["", [Validators.required]],
      editReplyEmail: ["", [Validators.required]],
      editDescription: ["", [Validators.required]],
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
    this.http
      .get(
        "http://localhost:8443/mainadmin/supportTickets/getTicketsCount" +
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

  getTickets() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/supportTickets/getAdminAllTickets" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.allTickets = data;
        this.rows = this.allTickets;
        this.srch = [...this.rows];
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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.multImages = event.target.files;
    }
  }
  // Add Ticket Modal Api Call

  addTickets() {
    if (this.addTicketForm.invalid) {
      this.markFormGroupTouched(this.addTicketForm);
      return;
    }
    var fd = new FormData();
    for (let image of this.multImages) {
      fd.append("files", image);
    }
    let params = new HttpParams();
    params = params.set("adminId", this.adminId);
    params = params.set(
      "ticketSubject",
      this.addTicketForm.value.addticketSubject
    );
    params = params.set("priority", this.addTicketForm.value.addPriorityName);
    params = params.set("replyPhone", this.addTicketForm.value.addReplyPhone);
    params = params.set("replyEmail", this.addTicketForm.value.addReplyEmail);
    params = params.set("description", this.addTicketForm.value.addDescription);
    params = params.set("companyName", this.companyName);

    this.http
      .post(
        "http://localhost:8443/mainadmin/supportTickets/createTickets?" +
          params,
        fd
      )
      .subscribe((data) => {
        this.getTickets();
        this.getTicketsCount();

      });

    $("#add_ticket").modal("hide");
    this.addTicketForm.reset();
    this.toastr.success("Tickets added", "Success");

    this.toastr.warning("Mandatory fields required", "");
  }

  // Edit Ticket Modal Api Call

  editTicket() {
    var fd = new FormData();
    for (let image of this.multImages) {
      fd.append("files", image);
    }
    let params = new HttpParams();
    params = params.set("editId", this.editId);
    params = params.set(
      "ticketSubject",
      this.editTicketForm.value.editTicketSubject
    );
    params = params.set("priority", this.editTicketForm.value.editPriorityName);
    params = params.set("replyPhone", this.editTicketForm.value.editReplyPhone);
    params = params.set("replyEmail", this.editTicketForm.value.editReplyEmail);
    params = params.set(
      "description",
      this.editTicketForm.value.editDescription
    );
    this.http
      .patch(
        "http://localhost:8443/mainadmin/supportTickets/updateSupportTickets?" +
          params,
        fd
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

  edit(id: any) {
    this.editId = id;
    const index = this.allTickets.findIndex((item) => {
      return item.id === id;
    });
    let toSetValues = this.allTickets[index];
    this.editTicketForm.patchValue({
      editTicketSubject: toSetValues.ticketSubject,
      editPriorityName: toSetValues.priority,
      editReplyPhone: toSetValues.replyPhone,
      editReplyEmail: toSetValues.replyEmail,
      editDescription: toSetValues.description,
      file: toSetValues.files,
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
        "http://localhost:8443/mainadmin/supportTickets/deleteTickets" +
          "/" +
          id,
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
        return (
          d.ticketSubject.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.replyPhone.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.replyEmail.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });
      this.rows.push(...temp);
    } else {
      this.getTickets();
    }
  }
  // getSearchData(val, val1) {
  //   if (val && val1) {
  //     this.rows.splice(0, this.rows.length);
  //     let temp = this.srch.filter(function (d) {
  //       val = val.toLowerCase();
  //       val1 = val1.toLowerCase();
  //       return (
  //         (d.createdDate.toLowerCase().indexOf(val) !== -1 || !val) &&
  //         (d.lastReply.toLowerCase().indexOf(val1) !== -1 || !val1)
  //       );
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

  //getting the status value
  // getStatus(data, id) {
  //   const status = data;
  //   this.http
  //     .patch(
  //       "http://localhost:8443/mainadmin/supportTickets/updateTicketStatus" +
  //         "/" +
  //         id,
  //       { status }
  //     )
  //     .subscribe((res) => {
  //       this.getTickets();
  //       this.getTicketsCount();
  //     });
  // }
  getPriority(data, id) {
    const priority = data;

    this.http
      .patch(
        "http://localhost:8443/mainadmin/supportTickets/updateTicketPriority" +
          "/" +
          id,
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

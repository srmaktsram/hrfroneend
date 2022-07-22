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
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";
import { type } from "jquery";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-tickets-content",
  templateUrl: "./tickets-content.component.html",
  styleUrls: ["./tickets-content.component.css"],
})
export class TicketsContentComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

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
  public addError = true;
  public editError = true;

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
  public totalSize: any;
  public flag = 0;
  public editFlag = 0;
  public format = 0;
  supportticketswriteRecep: string;
  supportticketswriteHr: string;
  supportTicketsWriteFin: string;
  supportTicketsWriteMan: string;
  supportTicketsWrite: string;
  supportTicketsWriteSub: string;

  constructor(
    private allModuleService: AllModulesService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.supportTicketsWrite = sessionStorage.getItem("supportTicketsWrite");
    this.supportTicketsWriteSub = sessionStorage.getItem("supportTicketsWriteSub");
    this.supportTicketsWriteMan = sessionStorage.getItem("supportTicketsWriteMan");
    this.supportTicketsWriteFin = sessionStorage.getItem("supportTicketsWriteFin");
    this.supportticketswriteRecep = sessionStorage.getItem("supportticketswriteRecep");
    this.supportticketswriteHr = sessionStorage.getItem("supportticketswriteHr");
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
      addReplyPhone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      addReplyEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      addDescription: [""],
      // addUploadFiles: [""],
      createdDate: [""],
      lastReply: [""],
    });

    // Edit Ticket Form Validation And Getting Values

    this.editTicketForm = this.formBuilder.group({
      editTicketSubject: ["", [Validators.required]],
      editPriorityName: ["", [Validators.required]],
      editReplyPhone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      editReplyEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
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
        console.log(data);
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
    var imgSize = 0;
    if (event.target.files.length > 0) {
      this.multImages = event.target.files;

      for (let item of this.multImages) {
        imgSize = imgSize + parseInt(item.size);
        if (
          item.type === "image/jpeg" ||
          item.type === "image/png" ||
          item.type === "image/jpg" ||
          "application/pdf"
        ) {
          this.format = 1;
        } else {
          this.format = 0;
        }
      }

      if (this.format == 1) {
        if (imgSize < 3145728) {
          alert("call huaa");
          this.addError = true;
          this.editError = true;
        } else {
          alert("call nhi huaa");
          this.addError = false;
          this.editError = false;
        }
      }
    }

    this.flag = imgSize;
    this.editFlag = imgSize;
  }

  // Add Ticket Modal Api Call

  addTickets() {
    if (this.addTicketForm.invalid) {
      this.markFormGroupTouched(this.addTicketForm);
      return;
    }

    if (this.flag < 3145728) {
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
      params = params.set(
        "description",
        this.addTicketForm.value.addDescription
      );
      params = params.set("companyName", this.companyName);

      this.http
        .post(
          "http://localhost:8443/mainadmin/supportTickets/createTickets?" +
          params,
          fd
        )
        .subscribe((data) => {
          console.log(data, "hvdvhjgdhjgdhj>>>>>>>>>>>>>>.");
          this.getTickets();
          this.getTicketsCount();
        });
    }
    $("#add_ticket").modal("hide");
    this.addTicketForm.reset();
    this._snackBar.open("Tickets added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this._snackBar.open("Mandatory fields required !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // Edit Ticket Modal Api Call

  editTicket() {
    if (this.flag < 3145728) {
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
      params = params.set(
        "priority",
        this.editTicketForm.value.editPriorityName
      );
      params = params.set(
        "replyPhone",
        this.editTicketForm.value.editReplyPhone
      );
      params = params.set(
        "replyEmail",
        this.editTicketForm.value.editReplyEmail
      );
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
          this.getTickets();
        });
    }
    $("#edit_ticket").modal("hide");
    this.editTicketForm.reset();
    this._snackBar.open("Ticket updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
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
        this.getTickets();
      });
    $("#delete_ticket").modal("hide");

    this._snackBar.open("Tickets deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
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
    this.dtTrigger.unsubscribe();
  }

  get(val) {
    let id = val;
    alert(id)
    this.router.navigate(["/layout/support/ticketsview"], {
      queryParams: {
        id: id
      },
      skipLocationChange: true,
    });
  }
}

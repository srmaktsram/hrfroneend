import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
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
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-user-main",
  templateUrl: "./user-main.component.html",
  styleUrls: ["./user-main.component.css"],
})
export class UserMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "users";
  public allUsers: any = [];
  public addUsers: FormGroup;
  public check: any;
  public editUsers: FormGroup;
  public showManager = true;
  public showSubadmin = true;
  public showAdmin = true;
  public showFinance = true;
  public showHr = true;
  public showReceptionist = true;

  public Holidays = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Employee = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Leaves = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Events = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Reports = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Accounting = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Sales = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Policies = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Assets = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public supportTickets = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public users = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public clients = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Jobs = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Training = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Performance = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Goals = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Payroll = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public attendanceReport = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];

  ///////All of these falls under jobs/////
  public userDasboard = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public jobDashboard = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public shortlistedCandidates = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public CandidatesList = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public scheduleTiming = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public appliedCandidates = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
 
  ////////
  public dashboard = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public apps = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Projects = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Leads = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Tickets = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Promotions = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Resignation = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Termination = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public KnowledgeBase = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Activities = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];
  public Settings = [
    { id: 0, read: false },
    { id: 1, write: false },
  ];


  public editId: any;
  public tempId: any;
  public adminId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();
  usersWriteMan: string;
  user_type: string;
  usersWrite: string;
  usersWriteSub: string;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.usersWrite = sessionStorage.getItem("usersWrite");
    this.usersWriteSub = sessionStorage.getItem("usersWriteSub");
    this.usersWriteMan = sessionStorage.getItem("usersWriteMan");
  }
  public initializeArray() {
    this.Holidays = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Employee = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Leaves = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Events = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Reports = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Accounting = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Sales = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Policies = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Assets = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.supportTickets = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.users = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.clients = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Jobs = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Training = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Performance = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Goals = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Payroll = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.attendanceReport = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.userDasboard = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.jobDashboard = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.shortlistedCandidates = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.CandidatesList = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.scheduleTiming = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.appliedCandidates = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.dashboard = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.apps = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Projects = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Leads = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Tickets = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Promotions = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Resignation = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Termination = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.KnowledgeBase = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Activities = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Settings = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
  }

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getUsers();

    // Add Provident Form Validation And Getting Values

    this.addUsers = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      addUserName: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          ),
        ],
      ],
      addEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      addRole: ["", [Validators.required]],

      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
    });

    // Edit Provident Form Validation And Getting Values

    this.editUsers = this.formBuilder.group({
      editUsersName: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          ),
        ],
      ],
      editEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      editRole: ["", [Validators.required]],
      editCompany: ["", [Validators.required]],
      firstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
    });
    // for data table configuration
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

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.allUsers = [];
    this.getUsers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getUsers() {
    this.http
      .get(
        "http://localhost:8443/admin/users/getAdminUsers" + "/" + this.adminId
      )
      .subscribe((data: any) => {
        console.log("Get User Roles", data);
        this.allUsers = data;
        this.rows = this.allUsers;

        this.srch = [...this.rows];
      });
  }

  //////////////password checking///////////////
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUsers.valid) {
      let obj = {
        adminId: this.adminId,
        name: this.addUsers.value.addUserName,
        email: this.addUsers.value.addEmail,
        role: this.addUsers.value.addRole,
        company: sessionStorage.getItem("companyName"),
        firstName: this.addUsers.value.firstName,
        lastName: this.addUsers.value.lastName,
        password: this.addUsers.value.password,
        confirmPassword: this.addUsers.value.confirmPassword,
        phone: this.addUsers.value.phone,
        holidays: this.Holidays,
        employee: this.Employee,
        leaves: this.Leaves,
        events: this.Events,
        Reports: this.Reports,
        Accounting: this.Accounting,
        Sales: this.Sales,
        Policies: this.Policies,
        Assets: this.Assets,
        supportTickets: this.supportTickets,
        users: this.users,
        clients: this.clients,
        Jobs: this.Jobs,
        Training: this.Training,
        Performance: this.Performance,
        Goals: this.Goals,
        Payroll: this.Payroll,
        attendanceReport: this.attendanceReport,
        userDasboard: this.userDasboard,
        jobDashboard: this.jobDashboard,
        shortlistedCandidates: this.shortlistedCandidates,
        CandidatesList: this.CandidatesList,
        scheduleTiming: this.scheduleTiming,
        appliedCandidates: this.appliedCandidates,
        dashboard: this.dashboard,
        apps: this.apps,
        Projects: this.Projects,
        Leads: this.Leads,
        Tickets: this.Tickets,
        Promotions: this.Promotions,
        Resignation: this.Resignation,
        Termination: this.Termination,
        KnowledgeBase: this.KnowledgeBase,
        Activities: this.Activities,
        Settings: this.Settings,
      };

      this.http
        .post("http://localhost:8443/admin/users/createUsers", obj)
        .subscribe((data: any) => {
          console.log("POST DATA>>>>>>>>>>>>>", data);
          this.getUsers();

          // $("#datatable").DataTable().clear();
        });

      $("#add_user").modal("hide");
      this.addUsers.reset();

      this.toastr.success("Users is added", "Success");
    } else {
      this.markFormGroupTouched(this.addUsers);
      this.toastr.warning("Mandatory fields required", "");
      return;
    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editUsers.valid) {
      let obj = {
        name: this.editUsers.value.editUsersName,

        email: this.editUsers.value.editEmail,
        role: this.editUsers.value.editRole,
        company: sessionStorage.getItem("companyName"),
        firstName: this.editUsers.value.firstName,
        lastName: this.editUsers.value.lastName,
        phone: this.editUsers.value.phone,
        holidays: this.Holidays,
        employee: this.Employee,
        leaves: this.Leaves,
        event: this.Events,
        Reports: this.Reports,
        Accounting: this.Accounting,
        Sales: this.Sales,
        Policies: this.Policies,
        Assets: this.Assets,
        supportTickets: this.supportTickets,
        users: this.users,
        clients: this.clients,
        Jobs: this.Jobs,
        Training: this.Training,
        Performance: this.Performance,
        Goals: this.Goals,
        Payroll: this.Payroll,
        attendanceReport: this.attendanceReport,
        userDasboard: this.userDasboard,
        jobDashboard: this.jobDashboard,
        shortlistedCandidates: this.shortlistedCandidates,
        CandidatesList: this.CandidatesList,
        scheduleTiming: this.scheduleTiming,
        appliedCandidates: this.appliedCandidates,
        dashboard: this.dashboard,
        apps: this.apps,
        Projects: this.Projects,
        Leads: this.Leads,
        Tickets: this.Tickets,
        Promotions: this.Promotions,
        Resignation: this.Resignation,
        Termination: this.Termination,
        KnowledgeBase: this.KnowledgeBase,
        Activities: this.Activities,
        Settings: this.Settings,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/users/updateUsers" + "/" + this.editId,
          obj
        )
        .subscribe((data: any) => {
          this.getUsers();
        });

      $("#edit_user").modal("hide");
      this.addUsers.reset();
      this.toastr.success("Users is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  edit(value) {
    this.editUsers.reset();
    this.editId = value;
    const index = this.allUsers.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allUsers[index];
    this.editUsers.patchValue({
      editUsersName: toSetValues.name,
      editEmail: toSetValues.email,
      editRole: toSetValues.role,
      editCompany: toSetValues.company,
      firstName: toSetValues.firstName,
      lastName: toSetValues.lastName,

      phone: toSetValues.phone,
    });
    
    this.showCheckBoxCondition(toSetValues.role)
    this.Holidays = toSetValues.holidays;

    this.Employee = toSetValues.employee;

    this.Leaves = toSetValues.leaves;

    this.Events = toSetValues.events;

    this.Reports = toSetValues.Reports;

    this.Accounting = toSetValues.Accounting;

    this.Sales = toSetValues.Sales;

    this.Policies = toSetValues.Policies;

    this.Assets = toSetValues.Assets;

    this.supportTickets = toSetValues.supportTickets;


    this.users = toSetValues.users;

    this.clients = toSetValues.clients;

    this.Jobs = toSetValues.Jobs;

    this.Training = toSetValues.Training;

    this.Performance = toSetValues.Performance;

    this.Goals = toSetValues.Goals;

    this.Payroll = toSetValues.Payroll;

    this.attendanceReport = toSetValues.attendanceReport;

    this.userDasboard = toSetValues.userDasboard;

    this.jobDashboard = toSetValues.jobDashboard;

    this.shortlistedCandidates = toSetValues.shortlistedCandidates;

    this.CandidatesList = toSetValues.CandidatesList;

    this.scheduleTiming = toSetValues.scheduleTiming;

    this.appliedCandidates = toSetValues.appliedCandidates;

    this.dashboard = toSetValues.dashboard;

    this.apps = toSetValues.apps;

    this.Projects = toSetValues.Projects;

    this.Leads = toSetValues.Leads;

    this.Tickets = toSetValues.Tickets;

    this.Promotions = toSetValues.Promotions;

    this.Resignation = toSetValues.Resignation;

    this.Termination = toSetValues.Termination;

    this.KnowledgeBase = toSetValues.KnowledgeBase;

    this.Activities = toSetValues.Activities;

    this.Settings = toSetValues.Settings;
  }

  // Delete Provident Modal Api Call

  deleteUsers() {
    this.http
      .patch(
        "http://localhost:8443/admin/users/deleteUsers" + "/" + this.tempId,
        { status: 2 }
      )
      .subscribe((data: any) => {
        this.getUsers();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    $("#delete_user").modal("hide");
    this.toastr.success("Users is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val ||
      d.lastName.toLowerCase().indexOf(val) !== -1 || !val
    });
    this.rows.push(...temp);
  }
  // search by Email
  searchEmail(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.email.toLowerCase().indexOf(val) !== -1 || !val ||
      d.name.toLowerCase().indexOf(val) !== -1 || !val
    });
    this.rows.push(...temp);
  }

  //search by name
  searchRole(val) {
    this.rows.splice(0, this.rows.length);
    this.srch.map((item) => {
      if (item.role === val) {
        this.rows.push(item);
      }
    });
  }

  /////////////Create function///////////////////////////////////////////
  checkEmployee(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Employee[0].read = true;
      } else {
        this.Employee[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Employee[1].write = true;
      } else {
        this.Employee[1].write = false;
      }
    }
  }

  checkHolidays(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Holidays[0].read = true;
      } else {
        this.Holidays[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Holidays[1].write = true;
      } else {
        this.Holidays[1].write = false;
      }
    }
  }

  checkLeaves(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Leaves[0].read = true;
      } else {
        this.Leaves[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Leaves[1].write = true;
      } else {
        this.Leaves[1].write = false;
      }
    }
  }

  checkEvents(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Events[0].read = true;
      } else {
        this.Events[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Events[1].write = true;
      } else {
        this.Events[1].write = false;
      }
    }
  }
  checkReports(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Reports[0].read = true;
      } else {
        this.Reports[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Reports[1].write = true;
      } else {
        this.Reports[1].write = false;
      }
    }
  }
  checkAccounting(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Accounting[0].read = true;
      } else {
        this.Accounting[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Accounting[1].write = true;
      } else {
        this.Accounting[1].write = false;
      }
    }
  }
  checkSales(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Sales[0].read = true;
      } else {
        this.Sales[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Sales[1].write = true;
      } else {
        this.Sales[1].write = false;
      }
    }
  }
  checkPolicies(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Policies[0].read = true;
      } else {
        this.Policies[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Policies[1].write = true;
      } else {
        this.Policies[1].write = false;
      }
    }
  }
  checkAssets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Assets[0].read = true;
      } else {
        this.Assets[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Assets[1].write = true;
      } else {
        this.Assets[1].write = false;
      }
    }
  }
  checkSupportTickets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.supportTickets[0].read = true;
      } else {
        this.supportTickets[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.supportTickets[1].write = true;
      } else {
        this.supportTickets[1].write = false;
      }
    }
  }
  checkUsers(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.users[0].read = true;
      } else {
        this.users[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.users[1].write = true;
      } else {
        this.users[1].write = false;
      }
    }
  }
  checkClients(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.clients[0].read = true;
      } else {
        this.clients[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.clients[1].write = true;
      } else {
        this.clients[1].write = false;
      }
    }
  }
  checkJobs(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Jobs[0].read = true;
      } else {
        this.Jobs[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Jobs[1].write = true;
      } else {
        this.Jobs[1].write = false;
      }
    }
  }
  checkTraining(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Training[0].read = true;
      } else {
        this.Training[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Training[1].write = true;
      } else {
        this.Training[1].write = false;
      }
    }
  }
  checkPerformance(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Performance[0].read = true;
      } else {
        this.Performance[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Performance[1].write = true;
      } else {
        this.Performance[1].write = false;
      }
    }
  }
  checkGoals(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Goals[0].read = true;
      } else {
        this.Goals[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Goals[1].write = true;
      } else {
        this.Goals[1].write = false;
      }
    }
  }
  checkPayrolls(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Payroll[0].read = true;
      } else {
        this.Payroll[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Payroll[1].write = true;
      } else {
        this.Payroll[1].write = false;
      }
    }
  }
  checkAttendanceReports(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.attendanceReport[0].read = true;
      } else {
        this.attendanceReport[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.attendanceReport[1].write = true;
      } else {
        this.attendanceReport[1].write = false;
      }
    }
  }
  checkUserDashboard(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.userDasboard[0].read = true;
      } else {
        this.userDasboard[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.userDasboard[1].write = true;
      } else {
        this.userDasboard[1].write = false;
      }
    }
  }
  checkJobDashboard(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.jobDashboard[0].read = true;
      } else {
        this.jobDashboard[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.jobDashboard[1].write = true;
      } else {
        this.jobDashboard[1].write = false;
      }
    }
  }
  checkShortlistedCandidates(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.shortlistedCandidates[0].read = true;
      } else {
        this.shortlistedCandidates[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.shortlistedCandidates[1].write = true;
      } else {
        this.shortlistedCandidates[1].write = false;
      }
    }
  }
  checkCandidatesList(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.CandidatesList[0].read = true;
      } else {
        this.CandidatesList[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.CandidatesList[1].write = true;
      } else {
        this.CandidatesList[1].write = false;
      }
    }
  }
  checkScheduleTiming(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.scheduleTiming[0].read = true;
      } else {
        this.scheduleTiming[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.scheduleTiming[1].write = true;
      } else {
        this.scheduleTiming[1].write = false;
      }
    }
  }
  checkAppliedCandidates(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.appliedCandidates[0].read = true;
      } else {
        this.appliedCandidates[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.appliedCandidates[1].write = true;
      } else {
        this.appliedCandidates[1].write = false;
      }
    }
  }
  checkDashboard(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.dashboard[0].read = true;
      } else {
        this.dashboard[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.dashboard[1].write = true;
      } else {
        this.dashboard[1].write = false;
      }
    }
  }
  checkApps(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.apps[0].read = true;
      } else {
        this.apps[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.apps[1].write = true;
      } else {
        this.apps[1].write = false;
      }
    }
  }
  checkProjects(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Projects[0].read = true;
      } else {
        this.Projects[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Projects[1].write = true;
      } else {
        this.Projects[1].write = false;
      }
    }
  }
  checkLeads(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Leads[0].read = true;
      } else {
        this.Leads[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Leads[1].write = true;
      } else {
        this.Leads[1].write = false;
      }
    }
  }
  checkTickets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Tickets[0].read = true;
      } else {
        this.Tickets[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Tickets[1].write = true;
      } else {
        this.Tickets[1].write = false;
      }
    }
  }
  checkPromotions(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Promotions[0].read = true;
      } else {
        this.Promotions[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Promotions[1].write = true;
      } else {
        this.Promotions[1].write = false;
      }
    }
  }
  checkResignation(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Resignation[0].read = true;
      } else {
        this.Resignation[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Resignation[1].write = true;
      } else {
        this.Resignation[1].write = false;
      }
    }
  }
  checkTermination(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Termination[0].read = true;
      } else {
        this.Termination[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Termination[1].write = true;
      } else {
        this.Termination[1].write = false;
      }
    }
  }
  checkKnowledgeBase(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.KnowledgeBase[0].read = true;
      } else {
        this.KnowledgeBase[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.KnowledgeBase[1].write = true;
      } else {
        this.KnowledgeBase[1].write = false;
      }
    }
  }
  checkActivities(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Activities[0].read = true;
      } else {
        this.Activities[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Activities[1].write = true;
      } else {
        this.Activities[1].write = false;
      }
    }
  }
  checkSettings(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        this.Settings[0].read = true;
      } else {
        this.Settings[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Settings[1].write = true;
      } else {
        this.Settings[1].write = false;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  showCheckBoxCondition(val) {
    alert(val);
    if (val == "Manager") {
      this.showManager = false;
      this.showSubadmin = true;
      this.showAdmin = true;
      this.showFinance = true;
      this.showHr = true;
      this.showReceptionist = true;
    }

    if (val == "SubAdmin") {
      this.showSubadmin = false;
      this.showManager = true;
      this.showAdmin = true;
      this.showFinance = true;
      this.showHr = true;
      this.showReceptionist = true;
    }
    if (val == "Admin") {
      this.showAdmin = false;
      this.showManager = true;
      this.showSubadmin = true;
      this.showFinance = true;
      this.showHr = true;
      this.showReceptionist = true;
    }
    if (val == "Finance") {
      this.showFinance = false;
      this.showManager = true;
      this.showSubadmin = true;
      this.showAdmin = true;
      this.showHr = true;
      this.showReceptionist = true;
    }
    if (val == "HR") {
      this.showHr = false;
      this.showManager = true;
      this.showSubadmin = true;
      this.showAdmin = true;
      this.showFinance = true;
      this.showReceptionist = true;
    }
    if (val == "Receptionist") {
      this.showReceptionist = false;
      this.showManager = true;
      this.showSubadmin = true;
      this.showAdmin = true;
      this.showFinance = true;
      this.showHr = true;
    }
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-sub-admin-list",
  templateUrl: "./sub-admin-list.component.html",
  styleUrls: ["./sub-admin-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
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
  subadmins: any;
  Affiliates: any;
  Kyc: any;
  Withdrawals: any;
  Commisions: any;
  PromoCodes: any;
  searchUser: any;
  searchMobile: any;
  searchEmail: any;
  payments: any;
  user_type: string;
  subadminwrite: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.subadminwrite = sessionStorage.getItem("subadminwrite");

    this.dashboard = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.premiumClients = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.freeClients = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.visitorClients = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.tickets = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.invoices = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.subadmins = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Affiliates = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Kyc = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Withdrawals = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.Commisions = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
    this.PromoCodes = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];

    this.payments = [
      { id: 0, read: false },
      { id: 1, write: false },
    ];
  }

  ngOnInit() {
    this.getSubAdmins();

    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };

    //Add clients form
    this.addClientForm = this.formBuilder.group({
      addUserName: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          ),
        ],
      ],
      addPassword: ["", [Validators.required]],
      addMobile: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      addEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
    });

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      editUserName: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          ),
        ],
      ],
      editPassword: ["", [Validators.required]],
      editMobile: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      editEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get all Clients data
  public getSubAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/subAdmin/getSubAdmins")
      .subscribe((res: any) => {
        this.data = res;
        this.srch = [...this.data];
      });
  }

  // Edit client
  public onEditClient(clientId: any) {
    this.editId = clientId;
    let client = this.data.filter((client) => client.id === clientId);
    this.editClientForm.patchValue({
      editUserName: client[0]?.userName,
      editPassword: client[0]?.password,
      editMobile: client[0]?.mobile,
      editEmail: client[0]?.email,
    });
    this.dashboard = client[0]?.dashboard;
    this.premiumClients = client[0]?.premiumClients;
    this.freeClients = client[0]?.freeClients;
    this.visitorClients = client[0]?.visitorClients;
    this.tickets = client[0]?.tickets;
    this.invoices = client[0]?.invoices;
    this.subadmins = client[0]?.subadmins;
    this.Affiliates = client[0]?.affiliates;
    this.Kyc = client[0]?.kyc;
    this.Withdrawals = client[0]?.withdrawals;
    this.Commisions = client[0]?.commisions;
    this.PromoCodes = client[0]?.promocode;
    this.payments = client[0]?.payments;
  }
  //Reset form
  public resetForm() {
    this.addClientForm.reset();
  }

  // Save Client
  public onSave() {
    let obj = {
      userName: this.editClientForm.value.editUserName,
      password: this.editClientForm.value.editPassword,
      mobile: this.editClientForm.value.editMobile,
      email: this.editClientForm.value.editEmail,
      dashboard: this.dashboard,
      premiumClients: this.premiumClients,
      freeClients: this.freeClients,
      visitorClients: this.visitorClients,
      tickets: this.tickets,
      invoices: this.invoices,
      subadmins: this.subadmins,
      affiliates: this.Affiliates,
      kyc: this.Kyc,
      withdrawals: this.Withdrawals,
      commisions: this.Commisions,
      promocode: this.PromoCodes,
      payments: this.payments,
      adminId: this.adminId,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/subAdmin/updateSubAdmin" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getSubAdmins();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();

    this._snackBar.open("Client updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Add new client
  public onAddClient() {
    let newClient = {
      userName: this.addClientForm.value.addUserName,
      password: this.addClientForm.value.addPassword,
      mobile: this.addClientForm.value.addMobile,
      email: this.addClientForm.value.addEmail,
      dashboard: this.dashboard,
      premiumClients: this.premiumClients,
      freeClients: this.freeClients,
      visitorClients: this.visitorClients,
      tickets: this.tickets,
      invoices: this.invoices,
      subadmins: this.subadmins,
      Affiliates: this.Affiliates,
      PromoCodes: this.PromoCodes,
      payments: this.payments,
      Commisions: this.Commisions,
      Withdrawals: this.Withdrawals,
      Kyc: this.Kyc,
    };
    this.http
      .post(
        "http://localhost:8443/mainadmin/subAdmin/createSubAdmin",
        newClient
      )
      .subscribe((data) => {
        this.getSubAdmins();
      });

    $("#add_client").modal("hide");
    this.addClientForm.reset();
    this._snackBar.open("Client added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Delete Client
  onDelete() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/mainadmin/subAdmin/deleteSubAdmin" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getSubAdmins();
      });

    $("#delete_client").modal("hide");
    this._snackBar.open("Client deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //search by name
  searchUsername(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.data.push(...temp);
    } else {
      this.getSubAdmins();
    }
  }

  //search by name
  searchByMobile(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.mobile.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.data.push(...temp);
    } else {
      this.getSubAdmins();
    }
  }

  //search by company
  searchByEmail(val) {
    if (val.trim()) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.email.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.data.push(...temp);
    } else {
      this.getSubAdmins();
    }
  }
  onSearch(userName, mobile, email) {
    this.filtereddata = [];
    this.searchMobile = mobile;
    this.searchUser = userName;
    this.searchEmail = email;
    this.clientsData = this.data;
    if (this.searchMobile) {
      this.filtereddata = this.clientsData.filter((data) =>
        data.mobile.toLowerCase().includes(this.searchMobile.toLowerCase())
      );
      if (this.searchUser) {
        let nameFilter = this.filtereddata.filter((data) =>
          data.userName.toLowerCase().includes(this.searchUser.toLowerCase())
        );
        if (nameFilter.length != 0) {
          this.filtereddata = nameFilter;
        }
      }

      if (this.searchEmail) {
        let nameFilter = this.filtereddata.filter((data) =>
          data.email.toLowerCase().includes(this.searchEmail.toLowerCase())
        );
        if (nameFilter.length != 0) {
          this.filtereddata = nameFilter;
        }
      }
    }

    if (this.searchMobile || this.searchUser || this.searchEmail) {
      this.clientsData =
        this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
    } else {
      this.clientsData = [];
    }
  }
  //getting the status value
  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/subAdmin/updateSubAdminStatus" +
          "/" +
          id,
        { status }
      )
      .subscribe((res) => {
        this.getSubAdmins();
      });
  }

  checkCheckBoxvalueDashboard(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.dashboard.findIndex((obj) => obj.id == val);
        this.dashboard[objIndex].read = true;
      } else {
        const objIndex = this.dashboard.findIndex((obj) => obj.id == val);
        this.dashboard[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.dashboard.findIndex((obj) => obj.id == val);
        this.dashboard[objIndex].write = true;
      } else {
        const objIndex = this.dashboard.findIndex((obj) => obj.id == val);
        this.dashboard[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvaluePayment(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.payments.findIndex((obj) => obj.id == val);
        this.payments[objIndex].read = true;
      } else {
        const objIndex = this.payments.findIndex((obj) => obj.id == val);
        this.payments[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.payments.findIndex((obj) => obj.id == val);
        this.payments[objIndex].write = true;
      } else {
        const objIndex = this.payments.findIndex((obj) => obj.id == val);
        this.payments[objIndex].write = false;
      }
    }
  }

  checkCheckBoxvaluePremiumClients(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.premiumClients.findIndex((obj) => obj.id == val);
        this.premiumClients[objIndex].read = true;
      } else {
        const objIndex = this.premiumClients.findIndex((obj) => obj.id == val);
        this.premiumClients[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.premiumClients.findIndex((obj) => obj.id == val);
        this.premiumClients[objIndex].write = true;
      } else {
        const objIndex = this.premiumClients.findIndex((obj) => obj.id == val);
        this.premiumClients[objIndex].write = false;
      }
    }
    //
  }

  checkCheckBoxvalueFreeClients(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.freeClients.findIndex((obj) => obj.id == val);
        this.freeClients[objIndex].read = true;
      } else {
        const objIndex = this.freeClients.findIndex((obj) => obj.id == val);
        this.freeClients[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.freeClients.findIndex((obj) => obj.id == val);
        this.freeClients[objIndex].write = true;
      } else {
        const objIndex = this.freeClients.findIndex((obj) => obj.id == val);
        this.freeClients[objIndex].write = false;
      }
    }
  }

  checkCheckBoxvalueVisitorClients(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.visitorClients.findIndex((obj) => obj.id == val);
        this.visitorClients[objIndex].read = true;
      } else {
        const objIndex = this.visitorClients.findIndex((obj) => obj.id == val);
        this.visitorClients[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.visitorClients.findIndex((obj) => obj.id == val);
        this.visitorClients[objIndex].write = true;
      } else {
        const objIndex = this.visitorClients.findIndex((obj) => obj.id == val);
        this.visitorClients[objIndex].write = false;
      }
    }
  }

  checkCheckBoxvalueTickets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.tickets.findIndex((obj) => obj.id == val);
        this.tickets[objIndex].read = true;
      } else {
        const objIndex = this.tickets.findIndex((obj) => obj.id == val);
        this.tickets[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.tickets.findIndex((obj) => obj.id == val);
        this.tickets[objIndex].write = true;
      } else {
        const objIndex = this.tickets.findIndex((obj) => obj.id == val);
        this.tickets[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvalueInvoices(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].read = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].write = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].write = false;
      }
    }
  }

  checkCheckBoxvalueAffiliate(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Affiliates.findIndex((obj) => obj.id == val);
        this.Affiliates[objIndex].read = true;
      } else {
        const objIndex = this.Affiliates.findIndex((obj) => obj.id == val);
        this.Affiliates[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Affiliates.findIndex((obj) => obj.id == val);
        this.Affiliates[objIndex].write = true;
      } else {
        const objIndex = this.Affiliates.findIndex((obj) => obj.id == val);
        this.Affiliates[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvaluePromoCode(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.PromoCodes.findIndex((obj) => obj.id == val);
        this.PromoCodes[objIndex].read = true;
      } else {
        const objIndex = this.PromoCodes.findIndex((obj) => obj.id == val);
        this.PromoCodes[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.PromoCodes.findIndex((obj) => obj.id == val);
        this.PromoCodes[objIndex].write = true;
      } else {
        const objIndex = this.PromoCodes.findIndex((obj) => obj.id == val);
        this.PromoCodes[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvalueKyc(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Kyc.findIndex((obj) => obj.id == val);
        this.Kyc[objIndex].read = true;
      } else {
        const objIndex = this.Kyc.findIndex((obj) => obj.id == val);
        this.Kyc[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Kyc.findIndex((obj) => obj.id == val);
        this.Kyc[objIndex].write = true;
      } else {
        const objIndex = this.Kyc.findIndex((obj) => obj.id == val);
        this.Kyc[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvalueWithdrawal(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Withdrawals.findIndex((obj) => obj.id == val);
        this.Withdrawals[objIndex].read = true;
      } else {
        const objIndex = this.Withdrawals.findIndex((obj) => obj.id == val);
        this.Withdrawals[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Withdrawals.findIndex((obj) => obj.id == val);
        this.Withdrawals[objIndex].write = true;
      } else {
        const objIndex = this.Withdrawals.findIndex((obj) => obj.id == val);
        this.Withdrawals[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvalueCommisions(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Commisions.findIndex((obj) => obj.id == val);
        this.Commisions[objIndex].read = true;
      } else {
        const objIndex = this.Commisions.findIndex((obj) => obj.id == val);
        this.Commisions[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Commisions.findIndex((obj) => obj.id == val);
        this.Commisions[objIndex].write = true;
      } else {
        const objIndex = this.Commisions.findIndex((obj) => obj.id == val);
        this.Commisions[objIndex].write = false;
      }
    }
  }
  checkCheckBoxvalueSubadmins(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.subadmins.findIndex((obj) => obj.id == val);
        this.subadmins[objIndex].read = true;
      } else {
        const objIndex = this.subadmins.findIndex((obj) => obj.id == val);
        this.subadmins[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.subadmins.findIndex((obj) => obj.id == val);
        this.subadmins[objIndex].write = true;
      } else {
        const objIndex = this.subadmins.findIndex((obj) => obj.id == val);
        this.subadmins[objIndex].write = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

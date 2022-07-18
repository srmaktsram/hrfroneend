import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-package-auth-list",
  templateUrl: "./package-auth-list.component.html",
  styleUrls: ["./package-auth-list.component.css"],
})
export class PackageAuthListComponent implements OnInit, OnDestroy {
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
  job: any;
  chat: any;
  role: any;
  supportTicket: any;
  accounting: any;
  sales: any;
  assests: any;
  performance: any;
  goals: any;
  training: any;
  gmail: any;
  payrole: any;
  searchUser: any;
  searchMobile: any;
  searchEmail: any;
  user_type: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.getSubAdmins();
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
  }

  ngOnInit() {
    this.job = [{ id: 0, access: false }];
    this.chat = [{ id: 0, access: false }];
    this.role = [{ id: 0, access: false }];
    this.supportTicket = [{ id: 0, access: false }];
    this.accounting = [{ id: 0, access: false }];
    this.sales = [{ id: 0, access: false }];
    this.assests = [{ id: 0, access: false }];
    this.performance = [{ id: 0, access: false }];
    this.goals = [{ id: 0, access: false }];
    this.training = [{ id: 0, access: false }];
    this.gmail = [{ id: 0, access: false }];
    this.payrole = [{ id: 0, access: false }];

    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };

    //Add clients form
    this.addClientForm = this.formBuilder.group({
      addPackageName: [
        "",
        [
          Validators.required,
          // Validators.pattern(
          //   "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          // ),
        ],
      ],
    });

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      editPackageName: [
        "",
        [
          Validators.required,
          // Validators.pattern(
          //   "^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$"
          // ),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.dtTrigger.next();
    // }, 1000);
  }

  //Get all Clients data
  public getSubAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/packageAuth/getPackageAuth")
      .subscribe((res: any) => {
        this.data = res;
        console.log("res-->", res);
        this.srch = [...this.data];
      });
  }

  // Edit client
  public onEditClient(clientId: any) {
    this.editId = clientId;
    let client = this.data.filter((client) => client.id === clientId);
    console.log("client-->", client);
    this.editClientForm.patchValue({
      editPackageName: client[0]?.packageName,
    });
    this.job = client[0]?.job;
    this.chat = client[0]?.chat;
    this.role = client[0]?.role;
    this.supportTicket = client[0]?.supportTicket;
    this.accounting = client[0]?.accounting;
    this.sales = client[0]?.sales;
    this.assests = client[0]?.assests;
    this.performance = client[0]?.performance;
    this.goals = client[0]?.goals;
    this.training = client[0]?.training;
    this.gmail = client[0]?.gmail;
    this.payrole = client[0]?.payrole;
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
      job: this.job,
      chat: this.chat,
      role: this.role,
      supportTicket: this.supportTicket,
      accounting: this.accounting,
      sales: this.sales,
      assests: this.assests,
      performance: this.performance,
      goals: this.goals,
      training: this.training,
      gmail: this.gmail,
      payrole: this.payrole,
      adminId: this.adminId,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/packageAuth/updatePackageAuth" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.getSubAdmins();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  //Add new client
  public onAddClient() {
    let newClient = {
      packageName: this.addClientForm.value.addPackageName,
      job: this.job,
      chat: this.chat,
      role: this.role,
      supportTicket: this.supportTicket,
      accounting: this.accounting,
      sales: this.sales,
      assests: this.assests,
      performance: this.performance,
      goals: this.goals,
      training: this.training,
      gmail: this.gmail,
      payrole: this.payrole,
      adminId: this.adminId,
    };
    this.http
      .post(
        "http://localhost:8443/mainadmin/packageAuth/createPackageAuth",
        newClient
      )
      .subscribe((data: any) => {
        console.log(data);
        this.getSubAdmins();
      });

    $("#add_client").modal("hide");
    this.addClientForm.reset();
    this.toastr.success("Client added sucessfully...!", "Success");
  }

  //Delete Client
  onDelete() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/mainadmin/packageAuth/deletePackageAuth" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.getSubAdmins();
      });

    $("#delete_client").modal("hide");
    this.toastr.success("Client deleted sucessfully...!", "Success");
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
        "http://localhost:8443/mainadmin/packageAuth/updatePackageAuthStatus" +
          "/" +
          id,
        { status }
      )
      .subscribe((res) => {
        this.getSubAdmins();
      });
  }

  checkCheckBoxvalueJob(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.job.findIndex((obj) => obj.id == val);
        this.job[objIndex].access = true;
      } else {
        const objIndex = this.job.findIndex((obj) => obj.id == val);
        this.job[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvalueChat(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.chat.findIndex((obj) => obj.id == val);
        this.chat[objIndex].access = true;
      } else {
        const objIndex = this.chat.findIndex((obj) => obj.id == val);
        this.chat[objIndex].access = false;
      }
    }
  }

  checkCheckBoxvalueSupportTicket(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.supportTicket.findIndex((obj) => obj.id == val);
        this.supportTicket[objIndex].access = true;
      } else {
        const objIndex = this.supportTicket.findIndex((obj) => obj.id == val);
        this.supportTicket[objIndex].access = false;
      }
    }
    //
  }

  checkCheckBoxvalueRole(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.role.findIndex((obj) => obj.id == val);
        this.role[objIndex].access = true;
      } else {
        const objIndex = this.role.findIndex((obj) => obj.id == val);
        this.role[objIndex].access = false;
      }
    }
  }

  checkCheckBoxvalueAssests(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.assests.findIndex((obj) => obj.id == val);
        this.assests[objIndex].access = true;
      } else {
        const objIndex = this.assests.findIndex((obj) => obj.id == val);
        this.assests[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvalueAccounting(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.accounting.findIndex((obj) => obj.id == val);
        this.accounting[objIndex].access = true;
      } else {
        const objIndex = this.accounting.findIndex((obj) => obj.id == val);
        this.accounting[objIndex].access = false;
      }
    }
  }

  checkCheckBoxvalueSales(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.sales.findIndex((obj) => obj.id == val);
        this.sales[objIndex].access = true;
      } else {
        const objIndex = this.sales.findIndex((obj) => obj.id == val);
        this.sales[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvaluePerformance(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.performance.findIndex((obj) => obj.id == val);
        this.performance[objIndex].access = true;
      } else {
        const objIndex = this.performance.findIndex((obj) => obj.id == val);
        this.performance[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvaluePayrole(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.payrole.findIndex((obj) => obj.id == val);
        this.payrole[objIndex].access = true;
      } else {
        const objIndex = this.payrole.findIndex((obj) => obj.id == val);
        this.payrole[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvalueTraining(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.training.findIndex((obj) => obj.id == val);
        this.training[objIndex].access = true;
      } else {
        const objIndex = this.training.findIndex((obj) => obj.id == val);
        this.training[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvalueGoals(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.goals.findIndex((obj) => obj.id == val);
        this.goals[objIndex].access = true;
      } else {
        const objIndex = this.goals.findIndex((obj) => obj.id == val);
        this.goals[objIndex].access = false;
      }
    }
  }
  checkCheckBoxvalueGmail(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.gmail.findIndex((obj) => obj.id == val);
        this.gmail[objIndex].access = true;
      } else {
        const objIndex = this.gmail.findIndex((obj) => obj.id == val);
        this.gmail[objIndex].access = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

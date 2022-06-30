import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-clients-content-page",
  templateUrl: "./clients-content-page.component.html",
  styleUrls: ["./clients-content-page.component.css"],
})
export class ClientsContentPageComponent implements OnInit, OnDestroy {
  public clientsData: any;
  public editedClient;
  public addClientForm: FormGroup;
  public editClientForm: FormGroup;
  public tempId: any;
  public searchName: any;
  public searchId: any;
  public searchCompany: any;
  public companiesList = [];
  public filtereddata = [];
  public adminId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  data: any;
  companys: any = [];
  invoices: any;
  tasks: any;
  chats: any;
  estimates: any;
  projects: any;
  timingSheets: any;
  editId: any;
  user_type: string;
  clientswrite: string;
  constructor(
    private allModulesService: AllModulesService,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem('adminId')
    this.user_type = sessionStorage.getItem("user_type");
    this.clientswrite = sessionStorage.getItem("clientswrite");
    // this.getCompanyName();
    this.invoices = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.projects = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.tasks = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.chats = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.estimates = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.timingSheets = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
  }

  ngOnInit() {
    this.getClients();

    //Add clients form
    this.addClientForm = this.formBuilder.group({
      clientName: ["", [Validators.required]],
      clientLastName: ["", [Validators.required]],
      clientPhone: ["", [Validators.required]],
      clientEmail: ["", [Validators.required]],
      clientPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      clientCompany: ["", [Validators.required]],
      clientUsername: ["", [Validators.required]],
      clientId: ["", [Validators.required]],
      birthday: ["", [Validators.required]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      
    });

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      editClientName: ["", [Validators.required]],
      editClientLastName: ["", [Validators.required]],
      editClientPhone: ["", [Validators.required]],
      editClientEmail: ["", [Validators.required]],
      // editclientPassword: ["", [Validators.required]],
      editClientUsername: ["", [Validators.required]],
      editClientCompany: ["", [Validators.required]],
      editClientRole: ["", [Validators.required]],
      editClientId: ["", [Validators.required]],
      birthday: ["", [Validators.required]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    });
  }

  //Get all Clients data
  public getClients() {
    this.http
      .get("http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId)
      .subscribe((res) => {
        this.data = res;
        //console.log(this.data, "new");
        this.rows = this.data;
        this.srch = [...this.rows];

      });
  }
  // public getCompanyName() {
  //   // this.allModulesService.get("clients").subscribe((data) => {
  //   this.http
  //     .get("http://localhost:8443/admin/clients/getDataClient")
  //     .subscribe((data) => {
  //       this.data = data;
  //       this.clientsData = this.data.data;
  //       this.companys = this.clientsData;
  //     });
  // }
  public onEditClient(clientId: any) {
    this.editId = clientId;
    let client = this.data.filter((client) => client.id === clientId);
    //console.log("edit recards", client);
    this.editClientForm.patchValue({
      editClientName: client[0]?.firstName,
      editClientLastName: client[0]?.lastName,
      editClientPhone: client[0]?.phone,
      editClientEmail: client[0]?.email,
      editClientUsername: client[0]?.username,
      // editClientPassword: client[0]?.password,
      editClientCompany: client[0]?.companyName,
      editClientRole: client[0]?.role,
      editClientId: client[0]?.clientId,

    });
    this.invoices = client[0]?.invoices;
    this.chats = client[0]?.chats;
    this.projects = client[0]?.projects;
    this.estimates = client[0]?.estimates;
    this.timingSheets = client[0]?.timingSheets;
    this.tasks = client[0]?.tasks;
  }

  //Reset form
  public resetForm() {
    this.addClientForm.reset();
  }

  // Save Client
  public onSave() {
    let obj = {
      firstName: this.editClientForm.value.editClientName,
      lastName: this.editClientForm.value.editClientLastName,
      role: "CEO",
      companyName: this.editClientForm.value.editClientCompany,
      clientId: this.editClientForm.value.editClientId,
      email: this.editClientForm.value.editClientEmail,
      username: this.editClientForm.value.editClientUsername,
      phone: this.editClientForm.value.editClientPhone,
      invoices: this.invoices,
      tasks: this.tasks,
      chats: this.chats,
      estimates: this.estimates,
      projects: this.projects,
      timingSheets: this.timingSheets,
    };
    //console.log("poppopp///////", obj)
    let id = this.editId;
    //console.log(id, "kkkkkk//////////////////////////")
    this.http
      .patch("http://localhost:8443/admin/clients/updateClient" + "/" + id, obj)
      .subscribe((data: any) => {
        //console.log("patchApi", data)
        this.getClients();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  //Add new client
  public onAddClient() {
    let newClient = {
      firstname: this.addClientForm.value.clientName,
      lastname: this.addClientForm.value.clientLastName,
      role: "CEO",
      company: this.addClientForm.value.clientCompany,
      username: this.addClientForm.value.clientUsername,
      clientId: this.addClientForm.value.clientId,
      email: this.addClientForm.value.clientEmail,
      password: this.addClientForm.value.clientPassword,
      phone: this.addClientForm.value.clientPhone,
      invoices: this.invoices,
      tasks: this.tasks,
      chats: this.chats,
      estimates: this.estimates,
      projects: this.projects,
      timingSheets: this.timingSheets,
      adminId: this.adminId,
      birthday:this.addClientForm.value.birthday,
      address:this.addClientForm.value.address,
      gender:this.addClientForm.value.gender,
    };
    //console.log("my data", newClient);
    this.http
      .post("http://localhost:8443/admin/clients/createClient", newClient)
      .subscribe((data:any) => {
        console.log(data, "<<<<<<<<<<<<postApi>>>>>>>>>>>>>>>>");
        this.getClients();
      });

    $("#add_client").modal("hide");
    this.addClientForm.reset();
    this.toastr.success("Client added sucessfully...!", "Success");
  }

  //Delete Client
  onDelete() {
    // this.allModulesService.delete(this.tempId, "clients").subscribe((data) => {
    let id = this.tempId;
    this.http
      .patch("http://localhost:8443/admin/clients/deleteClient" + "/" + id, {})
      .subscribe((data) => {
        this.getClients();
      });

    $("#delete_client").modal("hide");
    this.toastr.success("Client deleted sucessfully...!", "Success");
  }
  // Search Client
  onSearch(id, name, company) {
    this.filtereddata = [];
    this.searchId = id;
    this.searchName = name;
    this.searchCompany = company;
    this.clientsData = this.data.data;
    if (this.searchId) {
      this.filtereddata = this.clientsData.filter((data) =>
        data.clientId.toLowerCase().includes(this.searchId.toLowerCase())
      );
      if (this.searchName) {
        let nameFilter = this.filtereddata.filter((data) =>
          data.name.toLowerCase().includes(this.searchName.toLowerCase())
        );
        if (nameFilter.length != 0) {
          this.filtereddata = nameFilter;
        }
      }
    }

    if (this.searchId || this.searchCompany || this.searchName) {
      this.clientsData =
        this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
    } else {
      this.clientsData = [];
    }
  }

  //search by name
  searchID(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.clientId.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getClients();
    }
  }

  //search by name
  searchByName(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getClients();
    }
  }

  //search by company
  searchbyCompany(val) {
    if (val.trim()) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.companyName.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    } else {
      this.getClients();
    }
  }
  //getting the status value
  getStatus(data) {
    this.statusValue = data;
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
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].create = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].delete = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].import = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].export = true;
      } else {
        const objIndex = this.invoices.findIndex((obj) => obj.id == val);
        this.invoices[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueProjects(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].read = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].write = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].create = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].delete = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].import = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].export = true;
      } else {
        const objIndex = this.projects.findIndex((obj) => obj.id == val);
        this.projects[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueTasks(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].read = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].write = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].create = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].delete = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].import = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].export = true;
      } else {
        const objIndex = this.tasks.findIndex((obj) => obj.id == val);
        this.tasks[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueChats(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].read = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].write = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].create = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].delete = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].import = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].export = true;
      } else {
        const objIndex = this.chats.findIndex((obj) => obj.id == val);
        this.chats[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueEstimates(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].read = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].write = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].create = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].delete = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].import = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].export = true;
      } else {
        const objIndex = this.estimates.findIndex((obj) => obj.id == val);
        this.estimates[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueTimingSheets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].read = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].write = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].create = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].delete = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].import = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].export = true;
      } else {
        const objIndex = this.timingSheets.findIndex((obj) => obj.id == val);
        this.timingSheets[objIndex].export = false;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

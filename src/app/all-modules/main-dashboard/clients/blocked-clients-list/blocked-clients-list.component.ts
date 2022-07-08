import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";
import { AdminAuthenticationService } from "src/app/core/storage/authentication-admin.service";
import { Router } from "@angular/router";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";

declare const $: any;
@Component({
  selector: "app-blocked-clients-list",
  templateUrl: "./blocked-clients-list.component.html",
  styleUrls: ["./blocked-clients-list.component.css"],
})
export class BlockedClientsListComponent implements OnInit, OnDestroy {
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
  invoices: any;
  projects: any;
  tasks: any;
  chats: any;
  estimates: any;
  timingSheets: any;
  companys: any[];
  filtereddata: any[];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;
  constructor(
    private hrUserAuthenticationService: HrUserAuthenticationService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.getBlockedClients();

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      editClientEmail: ["", [Validators.required]],
      editClientPhone: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.dtTrigger.next();
    // }, 1000);
  }

  //Get all Clients data
  public getBlockedClients() {
    this.http
      .get("http://localhost:8443/mainadmin/clients/getBlockedClients")
      .subscribe((res: any) => {
        this.data = res;

        console.log(res, "Blocked Clients");
        this.srch = [...this.data];
      });
  }
  adminlogin(id) {
    alert(id);
    this.http
      .get("http://localhost:8443/auth/register/loginAsUser" + "/" + id)
      .subscribe((res: any) => {
        if (res.result == 2) {
          if (res.data.status !== "Blocked") {
            // window.location.replace("http://localhost:4200")
            window.open("http://localhost:4200", "_blank");
            this.hrUserAuthenticationService.login(
              res.data.id,
              res.data.corporateId,
              res.data.email,
              res.data.firstName,
              res.data.lastName,
              res.data.phone
            );
          }
          else {
            alert("Account Blocked By Main Admin");
          }
        }
         else {
          alert("wrong Id");
        }
      });
  }

  // Edit client
  public onEditClient(clientId: any) {
    this.editId = clientId;
    let client = this.data.filter((client) => client.id === clientId);
    this.editClientForm.patchValue({
      firstName: client[0]?.firstName,
      lastName: client[0]?.lastName,
      editClientEmail: client[0]?.email,
      editClientPhone: client[0]?.phone,
    });
  }
  //Reset form
  public resetForm() {
    this.addClientForm.reset();
  }

  // Save Client
  public onSave() {
    let obj = {
      firstName: this.editClientForm.value.firstName,
      lastName: this.editClientForm.value.lastName,
      email: this.editClientForm.value.editClientEmail,
      phone: this.editClientForm.value.editClientPhone,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/freeClient/updateFreeClient" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        console.log(data, "Edited Details for free Client");
        this.getBlockedClients();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  //////////////
  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/freeClient/updateFreeClientStatus" +
          "/" +
          id,
        { status }
      )
      .subscribe((res) => {
        this.getBlockedClients();
      });
  }

  //search by name
  // searchID(val) {
  //   if (val) {
  //     this.data.splice(0, this.data.length);
  //     let temp = this.srch.filter(function (d) {
  //       val = val.toLowerCase();
  //       return d.clientId.toLowerCase().indexOf(val) !== -1 || !val;
  //     });
  //     this.data.push(...temp);
  //   } else {
  //     // this.getClients();
  //   }
  // }

  //search by name
  searchByName(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return (
          d.firstName.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.lastName.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.email.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.phone.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });
      this.data.push(...temp);
    } else {
      this.getBlockedClients();
    }
  }

  //search by Corporate Id
  searchByCorporateId(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.corporateId.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.data.push(...temp);
    } else {
      this.getBlockedClients();
    }
  }
  onSearch(name, company) {
    this.filtereddata = [];
    this.searchName = name;
    this.searchCompany = company;
    this.clientsData = this.data;

    if (this.searchName) {
      let nameFilter = this.filtereddata.filter((data) =>
        data.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
      if (nameFilter.length != 0) {
        this.filtereddata = nameFilter;
      }
    }
    if (this.searchCompany || this.searchName) {
      this.clientsData =
        this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
    } else {
      this.clientsData = [];
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-visitor-clients-list",
  templateUrl: "./visitor-clients-list.component.html",
  styleUrls: ["./visitor-clients-list.component.css"],
})
export class VisitorClientsListComponent implements OnInit, OnDestroy {
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
    private toastr: ToastrService,
    private http: HttpClient,
    private hrUserAuthenticationService: HrUserAuthenticationService,

    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");


  }

  ngOnInit() {
    // this.getCompanyName()
    this.getVisitorAdmins();

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };


    this.editClientForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      editClientEmail: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      editClientPhone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  adminlogin(id) {
    alert(id);
    this.http
      .get("http://localhost:8443/auth/register/loginAsUser" + "/" + id)
      .subscribe((res: any) => {
        if (res.result == 2) {
          if (res.data.status !== "Blocked") {
            window.open("http://localhost:4200", "_blank");
            this.hrUserAuthenticationService.login(
              res.data.id,
              res.data.corporateId,
              res.data.email,
              res.data.firstName,
              res.data.lastName,
              res.data.phone,
            );
          } else {
            alert("Account Blocked By Main Admin");
          }
        } else {
          alert("wrong Id");
        }
      });
  }
  //Get all Clients data
  public getVisitorAdmins() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/visitorClient/getVisitorClients"
      )
      .subscribe((res: any) => {

        this.data = res;
        console.log("jbjhj.>>>>>>>>>>>>>>>>", this.data)
        this.srch = [...this.data];

      });
  }

  // public getCompanyName() {
  //   this.http
  //     .get("http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId)
  //     .subscribe((data) => {
  //       this.data = data;

  //       this.clientsData = this.data.data;
  //       this.companys = this.clientsData;
  //     });
  // }

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
      .patch("http://localhost:8443/mainadmin/visitorClient/updateVisitorClient" + "/" + id, obj)
      .subscribe((data) => {
        this.getVisitorAdmins();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/visitorClient/updateVisitorClientStatus" + "/" + id,
        { status }
      )
      .subscribe((res) => {
        this.getVisitorAdmins();


      });
  }
  getBlock(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/client/blockClientStatus" +
        "/" +
        id,
        { status }
      )
      .subscribe((res) => {
        this.getVisitorAdmins();


      });
  }
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
      this.getVisitorAdmins();
    }
  }

  //search by Corporate Id
  searchByCorporateId(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return (
          d.corporateId.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      })
      this.data.push(...temp);
    } else {
      this.getVisitorAdmins();

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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

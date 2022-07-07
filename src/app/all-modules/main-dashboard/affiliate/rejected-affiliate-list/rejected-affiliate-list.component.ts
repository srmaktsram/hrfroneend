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
  selector: "app-rejected-affiliate-list",
  templateUrl: "./rejected-affiliate-list.component.html",
  styleUrls: ["./rejected-affiliate-list.component.css"],
})
export class VisitorAffiliateListComponent implements OnInit, OnDestroy {
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
  statusData: any;
  affiliateswrite: string;
  user_type: string;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.affiliateswrite = sessionStorage.getItem("affiliateswrite");


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
      editClientCompany: ["", [Validators.required]],
      editContactPerson: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      editClientEmail: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      editClientPhone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      editCompanyEmail: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get all Clients data
  public getVisitorAdmins() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/affiliate/getRejectedAffiliate"
      )
      .subscribe((res: any) => {
        this.data = res;
        this.srch = [...this.data];

        // this.srch = res;
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
      editClientCompany: client[0]?.company,
      editContactPerson: client[0]?.name,
      editClientEmail: client[0]?.email,
      editClientPhone: client[0]?.phone,
      editCompanyEmail: client[0]?.last_name,

    });
  }
  //Reset form
  public resetForm() {
    this.addClientForm.reset();
  }

  // Save Client
  public onSave() {
    let obj = {
      company: this.editClientForm.value.editClientCompany,
      name: this.editClientForm.value.editContactPerson,
      email: this.editClientForm.value.editClientEmail,
      phone: this.editClientForm.value.editClientPhone,
      last_name: this.editClientForm.value.editCompanyEmail,

    };
    let id = this.editId;
    this.http
      .patch("http://localhost:8443/mainadmin/affiliate/updateAffiliate" + "/" + id, obj)
      .subscribe((data: any) => {
        this.getVisitorAdmins();
      });

    $("#edit_client").modal("hide");
    this.editClientForm.reset();
    this.toastr.success("Affiliate updated sucessfully...!", "Success");
  }


  deleteAffiliate(deleteId) {
    let id = deleteId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/affiliate/updateAffiliate" +
        "/" +
        id,
        { status: "2" }
      )
      .subscribe((data: any) => {
        this.getVisitorAdmins();
      });

  }




  getStatus(data, id) {
    const status = data;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/affiliate/updateAffiliate" + "/" + id,
        { status }
      )
      .subscribe((res: any) => {
        this.getVisitorAdmins();
        this.statusData = res.status;

        if (this.statusData == "Approve") {

          let obj = {
            id

          };
          this.http

            .post(
              "http://localhost:8443/affiliates/affiliate/createAffiliateWallet", obj
            )
            .subscribe((res: any) => {
            });
        }


      });
  }
  //search by name
  searchByName(val) {
    if (val) {
      this.data.splice(0, this.data.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return (
          d.first_name.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.email.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.phone.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.company.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      });
      this.data.push(...temp);
    } else {
      this.getVisitorAdmins();
    }
  }

  //search by company
  // searchByCompany(val) {
  //   if (val.trim()) {
  //     this.srch.splice(0, this.data.length);
  //     let temp = this.srch.filter(function (d) {
  //       val = val.toLowerCase();
  //       return d.companyName.toLowerCase().indexOf(val) !== -1 || !val;
  //     });
  //     this.srch.push(...temp);
  //   } else {
  //     this.getVisitorAdmins();

  //   }
  // }
  // onSearch(name, company) {
  //   this.filtereddata = [];
  //   this.searchName = name;
  //   this.searchCompany = company;
  //   this.clientsData = this.data;

  //   if (this.searchName) {
  //     let nameFilter = this.filtereddata.filter((data) =>
  //       data.name.toLowerCase().includes(this.searchName.toLowerCase())
  //     );
  //     if (nameFilter.length != 0) {
  //       this.filtereddata = nameFilter;
  //     }
  //   }
  //   if (this.searchCompany || this.searchName) {
  //     this.clientsData =
  //       this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
  //   } else {
  //     this.clientsData = [];
  //   }
  // }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

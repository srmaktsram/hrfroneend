import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  addPackageForm: FormGroup;
  editPackageForm: FormGroup;
  public tempId: any;
  public adminId: any;
  public companiesList = [];

  public data = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  editId: any;

  filtereddata = [];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;

  constructor(
    // private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    // this.getCompanyName()
    this.getPackages();

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //Add clients form
    this.addPackageForm = this.formBuilder.group({
      packageName: ["", [Validators.required]],
      monthlyPrice: ["", [Validators.required]],
      yearlyPrice: ["", [Validators.required]],
      offerMonthlyPrice: [""],
      offerYearlyPrice: [""],
      status: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editPackageForm = this.formBuilder.group({
      editpackageName: ["", [Validators.required]],
      editmonthlyPrice: ["", [Validators.required]],
      edityearlyPrice: ["", [Validators.required]],
      editofferMonthlyPrice: [""],
      editofferYearlyPrice: [""],
      editstatus: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get all Clients data
  public getPackages() {
    this.http
      .get("http://localhost:8443/mainadmin/pricing/getPackages")
      .subscribe((res: any[]) => {
        this.data = res;
        this.filtereddata = res;
        this.srch = res;
        console.log(this.data, "???????????//");
      });
  }

  // Edit client
  public onEditClient(id: any) {
    this.editId = id;
    let pkg = this.data.filter((item) => item.id == id);
    console.log("edit recards kkkk", pkg);
    this.editPackageForm.patchValue({
      editpackageName: pkg[0]?.packageName,
      editmonthlyPrice: pkg[0]?.monthlyPrice,
      edityearlyPrice: pkg[0]?.yearlyPrice,
      editofferMonthlyPrice: pkg[0]?.offerMonthlyPrice,
      editofferYearlyPrice: pkg[0]?.offerYearlyPrice,
      editstatus: pkg[0]?.status,
    });
  }
  //Reset form
  public resetForm() {
    this.addPackageForm.reset();
  }

  // Save Client
  public onSave() {
    let obj = {
      packageName: this.addPackageForm.value.editpackageName,
      monthlyPrice: this.addPackageForm.value.editmonthlyPrice,
      yearlyPrice: this.addPackageForm.value.edityearlyPrice,
      offerMonthlyPrice: this.addPackageForm.value.editofferMonthlyPrice,
      offerYearlyPrice: this.addPackageForm.value.editofferYearlyPrice,
      status: this.addPackageForm.value.editstatus,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/pricing/updatePackage" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getPackages();
      });

    $("#edit_client").modal("hide");
    this.editPackageForm.reset();
    this.toastr.success("Package updated sucessfully...!", "Success");
  }

  //Add new client
  public onAddPackage() {
    let obj = {
      packageName: this.addPackageForm.value.packageName,
      monthlyPrice: this.addPackageForm.value.monthlyPrice,
      yearlyPrice: this.addPackageForm.value.yearlyPrice,
      offerMonthlyPrice: this.addPackageForm.value.offerMonthlyPrice,
      offerYearlyPrice: this.addPackageForm.value.offerYearlyPrice,
      status: this.addPackageForm.value.status,
    };
    //console.log("mydata>>>>>>>>", newClient);
    this.http
      .post("http://localhost:8443/mainadmin/pricing/createPackage", obj)
      .subscribe((data) => {
        //console.log("postApi", data);
        this.getPackages();
      });

    $("#add_client").modal("hide");
    this.addPackageForm.reset();
    this.toastr.success("Client added sucessfully...!", "Success");
  }

  //Delete Client
  onDelete() {
    // this.allModulesService.delete(this.tempId, "clients").subscribe((data) => {
    let id = this.tempId;
    this.http
      .patch(
        "http://localhost:8443/mainadmin/pricing/deletePackage" + "/" + id,
        {}
      )
      .subscribe((data: any) => {
        this.getPackages();
      });

    $("#delete_client").modal("hide");
    this.toastr.success("Client deleted sucessfully...!", "Success");
  }

  //search by name
  searchID(val) {
    if (val) {
      console.log(this.data, ">>>>>>>>><<<<<<<<<<<<<<<<");
      this.data.splice(0, this.filtereddata.length);
      let temp = this.filtereddata.filter(function (d) {
        return d.packageName.indexOf(val) !== -1 || !val;
      });
      console.log(temp, ";;;;;;;;;;;;;;;;;;;;");
      this.data.push(...temp);
    } else {
      this.getPackages();
    }
  }

  //search by name
  // searchByName(val) {
  //   if (val) {
  //     this.data.splice(0, this.data.length);
  //     let temp = this.srch.filter(function (d) {
  //       val = val.toLowerCase();
  //       return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //     });
  //     this.data.push(...temp);
  //   } else {
  //     this.getPackages();
  //   }
  // }

  //search by company

  // onSearch(id, name, company) {
  //   this.filtereddata = [];
  //   this.searchId = id;
  //   this.searchName = name;
  //   this.searchCompany = company;
  //   this.clientsData = this.data;
  //   if (this.searchId) {
  //     this.filtereddata = this.clientsData.filter((data) =>
  //       data.clientId.toLowerCase().includes(this.searchId.toLowerCase())
  //     );
  //     if (this.searchName) {
  //       let nameFilter = this.filtereddata.filter((data) =>
  //         data.firstName.toLowerCase().includes(this.searchName.toLowerCase())
  //       );
  //       if (nameFilter.length != 0) {
  //         this.filtereddata = nameFilter;
  //       }
  //     }
  //   }

  //   if (this.searchId || this.searchCompany || this.searchName) {
  //     this.clientsData =
  //       this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
  //   } else {
  //     this.clientsData = [];
  //   }
  // }
  //getting the status value
  getStatus(val, id) {
    let obj = {
      status: val,
    };
    this.http
      .patch("http://localhost:8443/admin/clients/updateClient" + "/" + id, obj)
      .subscribe((data: any) => {
        this.getPackages();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

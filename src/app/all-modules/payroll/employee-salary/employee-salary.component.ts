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
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { id } from "src/assets/all-modules-data/id";
import { Router } from "@angular/router";

declare const $: any;

@Component({
  selector: "app-employee-salary",
  templateUrl: "./employee-salary.component.html",
  styleUrls: ["./employee-salary.component.css"],
})
export class EmployeeSalaryComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "employeeSalary";
  public adminId = sessionStorage.getItem("adminId");
  public allSalary: any = [];
  public addSalary: FormGroup;
  public editSalary: FormGroup;
  public editId: any;
  public tempId: any;
  public listemp: any;
  public employeeId: any;
  public email: any;
  public joinDate: any;
  public firstName: any;
  public role: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public basicValue;
  public daValue;
  public hraValue;
  public conveyanceValue;
  public allowanceValue;
  public medicalAllowanceValue;
  public othersAddValue;
  public tdsValue;
  public esiValue;
  public pfValue;
  public leaveValue;
  public profTaxValue;
  public labourValue;
  public othersDedValue;
  dataarr: any;
  designations: Object;
  disableButton = true;
  deduct: any;
  user_type: string;
  payrollswriteHr: string;
  payrollWrite: string;
  payrollWriteSub: string;

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,

    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.payrollWrite = sessionStorage.getItem("payrollWrite");
    this.payrollWriteSub = sessionStorage.getItem("payrollWriteSub");
    this.payrollswriteHr = sessionStorage.getItem("payrollswriteHr");
    this.getData();
    this.loadEmployee();
    this.getDesignation();
  }
  public loadEmployee() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.dataarr = data;

        this.srch = [...this.dataarr];
      });
  }
  public getDesignation() {
    this.http
      .get("http://localhost:8443/admin/designation/getData")
      .subscribe((data) => {
        this.designations = data;
      });
  }

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    // get all salary
    this.getSalary();

    // Add salary form Validation And Getting Values

    this.addSalary = this.formBuilder.group({
      selectStaff: [""],
      netSalary: [""],
      basic: ["", [Validators.required]],
      da: [""],
      hra: [""],
      conveyance: [""],
      allowance: [""],
      medicalAllowance: [""],
      othersAdd: [""],
      tds: [""],
      esi: [""],
      pf: [""],
      leave: [""],
      profTax: [""],
      labour: [""],
      othersDed: [""],
      date: ["", [Validators.required]],
    });

    // Edit salary Form Validation And Getting Values

    this.editSalary = this.formBuilder.group({
      editSelectStaff: [""],
      editNetSalary: [""],
      editBasic: ["", [Validators.required]],
      editDa: [""],
      editHra: [""],
      editConveyance: [""],
      editAllowance: [""],
      editMedAllowance: [""],
      editAddOthers: [""],
      editTds: [""],
      editEsi: [""],
      editPf: [""],
      editleave: [""],
      editProfTax: [""],
      editLabour: [""],
      editDedOthers: [""],
      editDate: [""],
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
    this.allSalary = [];
    this.getSalary();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //get data for data table

  getSalary() {
    this.http
      .get(
        "http://localhost:8443/admin/employeeSalary/getEmployeeSalary" +
          "/" +
          this.adminId
      )
      .subscribe((data1) => {
        this.allSalary = data1;
        this.rows = this.allSalary;
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

  // Add salary Modal Api Call

  addSalarySubmit() {
    if (this.addSalary.invalid) {
      this.markFormGroupTouched(this.addSalary);
      return;
    }
    if (this.addSalary.valid) {
      let adminId = this.adminId;
      let obj = {
        selectStaff: this.addSalary.value.selectStaff,
        // employeeId: "FT-0101",
        // email: "johndoe@example.com",
        // joinDate: "07-01-2019",
        // role: "Web Developer",
        // employeeRole: "Employee",
        // status: "pending",
        netSalary: this.addSalary.value.netSalary,
        basic: this.addSalary.value.basic,
        tds: this.addSalary.value.tds,
        da: this.addSalary.value.da,
        hra: this.addSalary.value.hra,
        pf: this.addSalary.value.pf,
        conveyance: this.addSalary.value.conveyance,
        leave: this.addSalary.value.leave,
        allowance: this.addSalary.value.allowance,
        profTax: this.addSalary.value.profTax,
        medicalAllowance: this.addSalary.value.medicalAllowance,
        labour: this.addSalary.value.labour,
        othersAdd: this.addSalary.value.othersAdd,
        othersDed: this.addSalary.value.othersDed,
        esi: this.addSalary.value.esi,
        adminId,
        employeeId: this.employeeId,
        email: this.email,
        joinDate: this.joinDate,
        firstName: this.firstName,
        role: this.role,
        date: this.pipe.transform(this.addSalary.value.date, "dd-MM-yyyy"),
      };

      this.http
        .post(
          "http://localhost:8443/admin/employeeSalary/createEmployeeSalary",
          obj
        )
        .subscribe((data) => {
          this.getSalary();

          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });

      $("#add_salary").modal("hide");
      this.addSalary.reset();
      this.toastr.success("Salary is added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  /////////delete Employee Salary
  deleteEmpSalary() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/employeeSalary/deleteEmployeeSalary" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.getSalary();
      });
    $("#delete_salary").modal("hide");
    this.toastr.success("Salary is deleted", "Success");
    this.toastr.success("Tickets deleted", "Success");
  }

  // changes in add form feilds
  changeAddPrice(name, value) {
    switch (name) {
      case 0:
        this.addSalary.patchValue({
          basic: value,
        });
        break;
      case 1:
        this.addSalary.patchValue({
          da: value,
        });
        break;
      case 2:
        this.addSalary.patchValue({
          hra: value,
        });
        break;
      case 3:
        this.addSalary.patchValue({
          conveyance: value,
        });
        break;
      case 4:
        this.addSalary.patchValue({
          allowance: value,
        });
        break;
      case 5:
        this.addSalary.patchValue({
          medicalAllowance: value,
        });
        break;
      case 6:
        this.addSalary.patchValue({
          othersAdd: value,
        });
        break;
      case 7:
        this.addSalary.patchValue({
          tds: value,
        });
        break;
      case 8:
        this.addSalary.patchValue({
          esi: value,
        });
        break;
      case 9:
        this.addSalary.patchValue({
          pf: value,
        });
        break;
      case 10:
        this.addSalary.patchValue({
          leave: value,
        });
        break;
      case 11:
        this.addSalary.patchValue({
          profTax: value,
        });
        break;
      case 12:
        this.addSalary.patchValue({
          labour: value,
        });
        break;
      case 13:
        this.addSalary.patchValue({
          othersDed: value,
        });
        break;
      default:
        break;
    }
    let basicValue = this.addSalary.value.basic;
    let daValue = this.addSalary.value.da;
    let hraValue = this.addSalary.value.hra;
    let conveyanceValue = this.addSalary.value.conveyance;
    let allowanceValue = this.addSalary.value.allowance;
    let medicalAllowanceValue = this.addSalary.value.medicalAllowance;
    let othersAddValue = this.addSalary.value.othersAdd;
    let tdsValue = this.addSalary.value.tds;
    let esiValue = this.addSalary.value.esi;
    let pfValue = this.addSalary.value.pf;
    let leaveValue = this.addSalary.value.leave;
    let profTaxValue = this.addSalary.value.profTax;
    let labourValue = this.addSalary.value.labour;
    let othersDedValue = this.addSalary.value.othersDed;

    let addValue =
      Number(basicValue) +
      Number(daValue) +
      Number(hraValue) +
      Number(conveyanceValue) +
      Number(allowanceValue) +
      Number(medicalAllowanceValue) +
      Number(othersAddValue);
    let dedutValue =
      Number(tdsValue) +
      Number(esiValue) +
      Number(pfValue) +
      Number(leaveValue) +
      Number(profTaxValue) +
      Number(labourValue) +
      Number(othersDedValue);
    this.addSalary.patchValue({
      netSalary: addValue - dedutValue,
    });
  }

  //changes in the edit form fields
  changeEditPrice(name, value) {
    switch (name) {
      case 0:
        this.editSalary.patchValue({
          editBasic: value,
        });
        break;
      case 1:
        this.editSalary.patchValue({
          editDa: value,
        });
        break;
      case 2:
        this.editSalary.patchValue({
          editHra: value,
        });
        break;
      case 3:
        this.editSalary.patchValue({
          editConveyance: value,
        });
        break;
      case 4:
        this.editSalary.patchValue({
          editAllowance: value,
        });
        break;
      case 5:
        this.editSalary.patchValue({
          editMedAllowance: value,
        });
        break;
      case 6:
        this.editSalary.patchValue({
          editAddOthers: value,
        });
        break;
      case 7:
        this.editSalary.patchValue({
          editTds: value,
        });
        break;
      case 8:
        this.editSalary.patchValue({
          editEsi: value,
        });
        break;
      case 9:
        this.editSalary.patchValue({
          editPf: value,
        });
        break;
      case 10:
        this.editSalary.patchValue({
          editleave: value,
        });
        break;
      case 11:
        this.editSalary.patchValue({
          editProfTax: value,
        });
        break;
      case 12:
        this.editSalary.patchValue({
          editLabour: value,
        });
        break;
      case 13:
        this.editSalary.patchValue({
          editDedOthers: value,
        });
        break;
      default:
        break;
    }
    let basicValue = this.editSalary.value.editBasic;
    let daValue = this.editSalary.value.editDa;
    let hraValue = this.editSalary.value.editHra;
    let conveyanceValue = this.editSalary.value.editConveyance;
    let allowanceValue = this.editSalary.value.editAllowance;
    let medicalAllowanceValue = this.editSalary.value.editMedAllowance;
    let othersAddValue = this.editSalary.value.editAddOthers;
    let tdsValue = this.editSalary.value.editTds;
    let esiValue = this.editSalary.value.editEsi;
    let pfValue = this.editSalary.value.editPf;
    let leaveValue = this.editSalary.value.editleave;
    let profTaxValue = this.editSalary.value.editProfTax;
    let labourValue = this.editSalary.value.editLabour;
    let othersDedValue = this.editSalary.value.editDedOthers;

    let addValue =
      Number(basicValue) +
      Number(daValue) +
      Number(hraValue) +
      Number(conveyanceValue) +
      Number(allowanceValue) +
      Number(medicalAllowanceValue) +
      Number(othersAddValue);
    let dedutValue =
      Number(tdsValue) +
      Number(esiValue) +
      Number(pfValue) +
      Number(leaveValue) +
      Number(profTaxValue) +
      Number(labourValue) +
      Number(othersDedValue);
    this.editSalary.patchValue({
      editNetSalary: addValue - dedutValue,
    });
  }

  // Edit salary Modal Api Call

  editSalarySubmit() {
    let obj = {
      employee: this.editSalary.value.editSelectStaff,
      // employeeId: "FT-0101",
      // email: "johndoe@example.com",
      // joinDate: "07-01-2019",
      // role: "Web Developer",
      // employeeRole: "Employee",
      // status: "pending",
      netSalary: this.editSalary.value.editNetSalary,
      basic: this.editSalary.value.editBasic,
      tds: this.editSalary.value.editTds,
      da: this.editSalary.value.editDa,
      hra: this.editSalary.value.editHra,
      pf: this.editSalary.value.editPf,
      conveyance: this.editSalary.value.editConveyance,
      leave: this.editSalary.value.editleave,
      allowance: this.editSalary.value.editAllowance,
      proTax: this.editSalary.value.editProfTax,
      medAllowance: this.editSalary.value.editMedAllowance,
      labour: this.editSalary.value.editLabour,
      othersAdd: this.editSalary.value.editAddOthers,
      othersDed: this.editSalary.value.editDedOthers,
      esi: this.editSalary.value.editEsi,
      date: this.editSalary.value.editDate,
    };
    let id = this.editId;
    this.http
      .patch(
        "http://localhost:8443/admin/employeeSalary/updateEmployeeSalary" +
          "/" +
          id,
        obj
      )
      .subscribe((data1) => {
        // $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
      });
    this.getSalary();
    $("#edit_salary").modal("hide");
    this.toastr.success("Salary is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allSalary.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allSalary[index];
    this.editSalary.patchValue({
      editSelectStaff: toSetValues.employee,
      editNetSalary: toSetValues.salary,
      editBasic: toSetValues.basic,
      editDa: toSetValues.da,
      editHra: toSetValues.hra,
      editConveyance: toSetValues.conveyance,
      editAllowance: toSetValues.allowance,
      editMedAllowance: toSetValues.medicalAllowance,
      editAddOthers: toSetValues.othersAdd,
      editTds: toSetValues.tds,
      editEsi: toSetValues.esi,
      editPf: toSetValues.pf,
      editleave: toSetValues.leave,
      editProfTax: toSetValues.profTax,
      editLabour: toSetValues.labour,
      editDedOthers: toSetValues.othersDed,
      editDate: toSetValues.date,
    });
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employee.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by role

  searchRole(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.role.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status

  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ////////////////////////////////////////
  getSearchData(val, val1) {
    if (val && val1) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        val1 = val1.toLowerCase();
        return (
          (d.date.toLowerCase().indexOf(val) !== -1 || !val) &&
          (d.date.toLowerCase().indexOf(val1) !== -1 || !val1)
        );
      });

      this.rows.push(...temp);
    } else {
      this.getSalary();
    }
  }

  searchByFrom(val, val1) {
    if (val && val1) {
      this.disableButton = false;
    }
    if (val) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");

      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
    } else {
      this.getSalary();
    }
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by To value
  searchByTo(val, val1) {
    if (val && val1) {
      this.disableButton = false;
    }
    if (val) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");

      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
    } else {
      this.getSalary();
    }
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  getStatus(data) {
    this.statusValue = data;
  }

  getData() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((res) => {
        this.listemp = res;
      });
  }
  //
  getEmpl(employeeId, email, joinDate, firstName, role) {
    this.employeeId = employeeId;
    this.email = email;
    this.joinDate = joinDate;
    this.firstName = firstName;
    this.role = role;
  }

  generateSlip(id) {
    sessionStorage.setItem("slipId", id);
    this.router.navigate(["/layout/payroll/salary-view"]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

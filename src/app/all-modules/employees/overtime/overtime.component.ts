import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
declare const $: any;

@Component({
  selector: "app-overtime",
  templateUrl: "./overtime.component.html",
  styleUrls: ["./overtime.component.css"],
})
export class OvertimeComponent implements OnInit {
  lstOvertime: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public employeeid;
  public adminId = sessionStorage.getItem("adminId");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  url: any = "overtime";
  public tempId: any;
  public editId: any;
  public id: any
  public addOvertimeForm: FormGroup;
  public editOvertimeForm: FormGroup;

  lstEmployee: any;
  name: any;
  constructor(
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.getEmployeeData()

  }

  ngOnInit() {

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.LoadOvertime();
    this.addOvertimeForm = this.formBuilder.group({

      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }

  // Get overtime list  Api Call
  LoadOvertime() {
    this.http.get("http://localhost:8443/admin/overtime/getAllOvertime" + "/" + this.adminId).subscribe((res: any) => {
      console.log("getApiokkkk", res)
      this.lstOvertime = res;
      console.log(this.lstOvertime, "kkpkpkpkp")
      // this.dtTrigger.next();
      this.rows = this.lstOvertime;
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

  getIdFirstName(id, name) {
    this.employeeid = id
    this.name = name
  }
  // Add overtime  Modal Api Call
  addOvertime() {
    alert("called")
    alert(this.name)
    if (this.addOvertimeForm.invalid) {
      this.markFormGroupTouched(this.addOvertimeForm);
      return;
    }
    if (this.addOvertimeForm.valid) {
      let Datetime = this.pipe.transform(
        this.addOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        adminId: this.adminId,
        employeeid: this.employeeid,
        name: this.name,
        otDate: Datetime,
        otHrs: this.addOvertimeForm.value.OtHrs,
        // otType: "Normal day OT 1.5x",
        // status: "New",
        // approvedBy: "Richard Miles",
        description: this.addOvertimeForm.value.Description,
      };
      console.log("plppppppppppp", obj);
      console.log("name", obj.name);
      this.http
        .post("http://localhost:8443/admin/overtime/createOvertime", obj)
        .subscribe((res) => {
          console.log("postApi", res);
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.LoadOvertime();
          });
        });


      $("#add_overtime").modal("hide");
      this.addOvertimeForm.reset();
      this.toastr.success("Overtime added sucessfully...!", "Success");
    }
  }

  editOvertime() {
    if (this.editOvertimeForm.valid) {
      this.id = this.editId
      let Datetime = this.pipe.transform(
        this.editOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        name: this.editOvertimeForm.value.EmployeeName,
        otDate: Datetime,
        otHrs: this.editOvertimeForm.value.OtHrs,
        description: this.editOvertimeForm.value.Description,
      };
      this.http.patch("http://localhost:8443/admin/overtime/updateOvertime" + "/" + this.id, obj).subscribe((res) => {
        console.log("updateApi", res);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.LoadOvertime();
        });
      });
      $("#edit_overtime").modal("hide");
      this.toastr.success("Overtime Updated sucessfully...!", "Success");
    }
  }

  // To Get The Overtime Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstOvertime.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstOvertime[index];
    this.editOvertimeForm.patchValue({
      EmployeeName: toSetValues.name,
      OtDate: toSetValues.otDate,
      OtHrs: toSetValues.otHrs,
      Description: toSetValues.description,
    });
  }

  // Delete Overtime Modal Api Call

  deleteOvetime() {
    this.id = this.tempId
    let obj = {
      status: 2
    };

    this.http.patch("http://localhost:8443/admin/overtime/deleteOvertime" + "/" + this.id, obj).subscribe((res: any) => {
      console.log("deleteApi", res)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadOvertime();
      $("#delete_overtime").modal("hide");
      this.toastr.success("Overtime deleted sucessfully..!", "Success");
    });
  }

  // getting the status value
  // getStatus(data) {
  //   this.statusValue = data;
  // }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getEmployeeData() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
        "/" +
        this.adminId
      )
      .subscribe((data: any) => {
        console.log("getDropdownData", data);
        this.lstEmployee = data;
        this.rows = this.lstEmployee;
        this.srch = [...this.rows];
      });
  }
  getId(id) {
    sessionStorage.setItem("empid", id);
    this.router.navigate(["/layout/employees/employeeprofile"]);
  }

  updateStatus(val, id) {
    this.http.patch("http://localhost:8443/admin/overtime/updateOvertime" + "/" + id, { status: val }).subscribe((res) => {
      console.log("updateApi", res);
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   dtInstance.destroy();
      this.LoadOvertime();
      // });
    });
  }
}

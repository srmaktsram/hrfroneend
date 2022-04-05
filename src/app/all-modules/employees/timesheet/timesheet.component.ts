import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-timesheet",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.css"],
})
export class TimesheetComponent implements OnInit {
  lstTimesheet: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "timesheet";
  public id: any;
  public tempId: any;
  public editId: any;
  public adminId = sessionStorage.getItem("adminId")
  public employeeid = sessionStorage.getItem("employee_login_id")
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addTimesheetForm: FormGroup;
  public editTimesheetForm: FormGroup;
  public editDatetime: any;
  public editDeadline: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.LoadTimewsheet();
    this.addTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get Timesheet list  Api Call
  LoadTimewsheet() {
    this.http.get("http://localhost:8443/admin/timesheet/show" + "/" + this.adminId + "/" + this.employeeid).subscribe((res: any) => {
      console.log("getApi", res)
      this.lstTimesheet = res.data;
      console.log(this.lstTimesheet)
      this.rows = this.lstTimesheet;
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


  // Add Department  Modal Api Call
  addTimesheet() {
    if (this.addTimesheetForm.invalid) {
      this.markFormGroupTouched(this.addTimesheetForm)
      return
    }
    if (this.addTimesheetForm.valid) {
      let Datetime = this.pipe.transform(
        this.addTimesheetForm.value.TimeDate,
        "dd-MM-yyyy"
      );
      let deadLine = this.pipe.transform(
        this.addTimesheetForm.value.DeadlineName,
        "dd-MM-yyyy"
      );
      // this.adminId = sessionStorage.getItem("adminId");
      // this.employeeid = sessionStorage.getItem("employee_login_id");
      let adminId = this.adminId;
      let employeeid = this.employeeid;
      let obj = {
        //  employee: "John doe Galaviz",
        project: this.addTimesheetForm.value.Project,
        date: Datetime,
        deadline: deadLine,
        totalHrs: this.addTimesheetForm.value.totalHours,
        remainHrs: this.addTimesheetForm.value.remainingHours,
        // assignedhours: "20",
        hrs: this.addTimesheetForm.value.Hrs,
        description: this.addTimesheetForm.value.Description,
        adminId,
        employeeid,
      };
      // this.srvModuleService.add(obj, this.url).subscribe((data) => {



      this.http.post("http://localhost:8443/admin/timesheet/create", obj).subscribe((res) => {
        console.log("postApi", res)

        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.LoadTimewsheet();
        });
        this.dtTrigger.next();
      });

      $("#add_todaywork").modal("hide");
      this.addTimesheetForm.reset();
      this.toastr.success("Timesheet added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editDatetime = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editDeadline = this.pipe.transform(data, "dd-MM-yyyy");
  }
  editTimesheet() {

    if (this.editTimesheetForm.valid) {
      this.id = this.editId
      let obj = {
        employee: " ",
        project: this.editTimesheetForm.value.Project,
        date: this.editDatetime,
        deadline: this.editDeadline,
        totalHrs: this.editTimesheetForm.value.totalHours,
        remainHrs: this.editTimesheetForm.value.remainingHours,
        assignedhours: " ",
        hrs: this.editTimesheetForm.value.Hrs,
        description: this.editTimesheetForm.value.Description,
      };
      this.http.patch("http://localhost:8443/admin/timesheet/update" + "/" + this.id, obj).subscribe((res) => {
        console.log("updateApi", res);
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.LoadTimewsheet();
        });
        this.dtTrigger.next();
      });

      $("#edit_todaywork").modal("hide");
      this.toastr.success("Timesheet Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTimesheet.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTimesheet[index];
    this.editTimesheetForm.patchValue({
      Project: toSetValues.project,
      TimeDate: toSetValues.date,
      DeadlineName: toSetValues.deadline,
      totalHours: toSetValues.totalHrs,
      remainingHours: toSetValues.remainHrs,
      Hrs: toSetValues.hrs,
      Description: toSetValues.description,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteTimesheet() {

    let id = this.tempId
    let obj = {
      status: 2
    };

    this.http.patch("http://localhost:8443/admin/timesheet/delete" + "/" + id, obj).subscribe((res) => {
      console.log("deleteApi", res)
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.LoadTimewsheet();
      });
      this.dtTrigger.next();

      $("#delete_timesheet").modal("hide");
      this.toastr.success("Timesheet deleted sucessfully..!", "Success");
    });
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

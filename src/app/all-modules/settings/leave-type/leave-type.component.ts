import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
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
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-leave-type",
  templateUrl: "./leave-type.component.html",
  styleUrls: ["./leave-type.component.css"],
})
export class LeaveTypeComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "leaveType";
  public allLeaveType: any = [];
  public addLeaveType: FormGroup;
  public editLeaveType: FormGroup;
  public editId: any;
  public tempId: any;
  public adminId = sessionStorage.getItem("adminId");
  buttondisable = false;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getLeaveType();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    // Add Provident Form Validation And Getting Values

    this.addLeaveType = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      addLeaveDays: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editLeaveType = this.formBuilder.group({
      editLeave: ["", [Validators.required]],
      editLeaveDays: ["", [Validators.required]],
    });
  }

  getLeaveType() {
    this.http
      .get(
        "http://localhost:8443/admin/leaveType/getLeaveType" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.allLeaveType = data;
      });
  }

  // Add Provident Modal Api Call

  addLeave() {
    if (this.addLeaveType.valid) {
      let adminId = this.adminId;

      let obj = {
        leaveType: this.addLeaveType.value.addLeaveType,
        leaveDays: this.addLeaveType.value.addLeaveDays,
        adminId,
        status: "New",
      };
      this.http
        .post("http://localhost:8443/admin/leaveType/createLeaveType", obj)
        .subscribe((data) => {
          this.buttondisable = false;
          this.getLeaveType();
        });
      $("#add_leavetype").modal("hide");
      this.addLeaveType.reset();
      this.toastr.success("Leave type is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editLeave() {
    let id = this.editId;
    let obj = {
      leaveType: this.editLeaveType.value.editLeave,
      leaveDays: this.editLeaveType.value.editLeaveDays,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/leaveType/updateLeaveType" + "/" + id,
        obj
      )
      .subscribe((data1) => {
        this.getLeaveType();
      });
    $("#edit_leavetype").modal("hide");
    this.toastr.success("Leave type is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allLeaveType.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allLeaveType[index];
    this.editLeaveType.patchValue({
      editLeave: toSetValues.leaveType,
      editLeaveDays: toSetValues.leaveDays,
    });
  }

  // Delete Provident Modal Api Call

  deleteLeave() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/leaveType/deleteLeaveType" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.getLeaveType();
        $("#delete_leavetype").modal("hide");
        this.toastr.success("Leave type is deleted", "Success");
      });
  }
  //getting the status value
  getStatus(data, id) {
    const status = data;

    this.http
      .patch(
        "http://localhost:8443/admin/leaveType/updateLeaveTypeStatus" +
          "/" +
          id,
        { status: data }
      )
      .subscribe((res: any) => {
        this.getLeaveType();
      });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

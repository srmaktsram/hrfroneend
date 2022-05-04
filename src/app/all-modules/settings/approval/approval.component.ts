import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-approval",
  templateUrl: "./approval.component.html",
  styleUrls: ["./approval.component.css"],
})
export class ApprovalComponent implements OnInit {
  public adminId = sessionStorage.getItem("adminId");
  addApproval: FormGroup;
  designations: any;
  approver1: any;
  approver2: any;
  approver3: any;
  buttondisable = false;
  expApproval: any;
  addLeaveApproval: FormGroup;
  leaveApproval: any;
  addOfferApproval: FormGroup;
  offerApproval: any;
  addResignationNotice: FormGroup;
  resignationNotice: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.getDesignation();
  }
  public getDesignation() {
    this.http
      .get("http://localhost:8443/admin/designation/getData")
      .subscribe((data: any) => {
        this.designations = data;
      });
  }

  ngOnInit() {
    this.getExpApproval();
    this.getLeaveApproval();
    this.getOfferApproval();
    this.getResignationNotices();

    // Add form for Expense Approval
    this.addApproval = this.formBuilder.group({
      addApprovals: [""],
      addApprover1: [""],
      addApprover2: [""],
      addApprover3: [""],
    });
    // Add form for Leave Approvals
    this.addLeaveApproval = this.formBuilder.group({
      addApprovals: [""],
      addApprover: [""],
    });
    //Add form for Offer Approvals
    this.addOfferApproval = this.formBuilder.group({
      addApprovals: [""],
    });
    //Add form for Resignation Notices

    this.addResignationNotice = this.formBuilder.group({
      addApprover: [""],
      addNoticeDays: [""],
    });
  }

  /// Create Expense Approvals
  createApproval() {
    if (this.addApproval.valid) {
      let adminId = this.adminId;

      let obj = {
        approval: this.addApproval.value.addApprovals,
        approver1: this.addApproval.value.addApprover1,
        approver2: this.addApproval.value.addApprover2,
        approver3: this.addApproval.value.addApprover3,
        adminId,
      };
      this.http
        .post("http://localhost:8443/admin/approval/createExpenseApproval", obj)
        .subscribe((data) => {
          this.getExpApproval();
          this.buttondisable = false;
        });
    }
  }

  ///// Get  Expense Approvals
  getExpApproval() {
    this.http
      .get(
        "http://localhost:8443/admin/approval/getExpenseApproval" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.expApproval = data;
        this.addApproval.patchValue({
          addApprovals: this.expApproval.approval,
          addApprover1: this.expApproval.approver1,
          addApprover2: this.expApproval.approver2,
          addApprover3: this.expApproval.approver3,
        });
      });
  }

  //Create Leave approvals
  createLeaveApproval() {
    if (this.addLeaveApproval.valid) {
      let adminId = this.adminId;

      let obj = {
        approval: this.addLeaveApproval.value.addApprovals,
        approver: this.addLeaveApproval.value.addApprover,
        adminId,
      };
      this.http
        .post("http://localhost:8443/admin/approval/createLeaveApproval", obj)
        .subscribe((data) => {
          this.getLeaveApproval();
          this.buttondisable = false;
        });
    }
  }
  //Get Leave Approvals
  getLeaveApproval() {
    this.http
      .get(
        "http://localhost:8443/admin/approval/getLeaveApproval" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.leaveApproval = data;
        this.addLeaveApproval.patchValue({
          addApprovals: this.leaveApproval.approval,
          addApprover: this.leaveApproval.approver,
        });
      });
  }
  // create offer approvals
  createOfferApproval() {
    if (this.addOfferApproval.valid) {
      let adminId = this.adminId;
      let obj = {
        approval: this.addOfferApproval.value.addApprovals,
        adminId,
      };
      this.http
        .post("http://localhost:8443/admin/approval/createOfferApproval", obj)
        .subscribe((data) => {
          this.getOfferApproval();
          this.buttondisable = false;
        });
    }
  }
  /// Get offerApprovals
  getOfferApproval() {
    this.http
      .get(
        "http://localhost:8443/admin/approval/getOfferApproval" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.offerApproval = data;
        this.addOfferApproval.patchValue({
          addApprovals: this.offerApproval.approval,
        });
      });
  }
  //// Creating Resignation Notices
  createResignationNotice() {
    if (this.addResignationNotice.valid) {
      let adminId = this.adminId;
      let obj = {
        approver: this.addResignationNotice.value.addApprover,
        noticeDays: this.addResignationNotice.value.addNoticeDays,
        adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/approval/createResignationNotice",
          obj
        )
        .subscribe((data) => {
          this.getResignationNotices();
          this.buttondisable = false;
        });
    }
  }
  ///// Get Resignation Notice
  getResignationNotices() {
    this.http
      .get(
        "http://localhost:8443/admin/approval/getResignationNotice" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.resignationNotice = data;
        this.addResignationNotice.patchValue({
          addApprover: this.resignationNotice.approver,
          addNoticeDays: this.resignationNotice.noticeDays,
        });
      });
  }
}

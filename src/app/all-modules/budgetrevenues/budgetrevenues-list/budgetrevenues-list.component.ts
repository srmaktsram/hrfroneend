import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;

@Component({
  selector: "app-budgetrevenues-list",
  templateUrl: "./budgetrevenues-list.component.html",
  styleUrls: ["./budgetrevenues-list.component.css"],
})
export class BudgetrevenuesListComponent implements OnInit {
  public url: any = "revenue";
  public tempId: any;
  public addRevenueForm: FormGroup;
  public lstRevenue;
  public pipe = new DatePipe("en-US");
  public id: any;
  public adminId = sessionStorage.getItem("adminId");
  dataarr: any;
  srch: any[];
  editRevenueForm: FormGroup;
  editId: any;
  editedvalue: any;

  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.LoadCategories();
  }
  public LoadCategories() {
    this.http
      .get(
        "http://localhost:8443/admin/category/getCategory" + "/" + this.adminId
      )
      .subscribe((data) => {
        this.dataarr = data;

        this.srch = [...this.dataarr];
      });
  }

  ngOnInit() {
    // Floating Label

    if ($(".floating").length > 0) {
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass(
              "focused",
              e.type === "focus" || this.value.length > 0
            );
        })
        .trigger("blur");
    }
    this.LoadRevenue();

    this.addRevenueForm = this.formBuilder.group({
      RevenueName: ["", [Validators.required]],
      RevenueNotes: ["", [Validators.required]],
      RevenueDate: ["", [Validators.required]],
      SubCategoryName: ["", [Validators.required]],
      CategoryName: ["", [Validators.required]],
    });
    this.editRevenueForm = this.formBuilder.group({
      RevenueName: ["", [Validators.required]],
      RevenueNotes: ["", [Validators.required]],
      RevenueDate: ["", [Validators.required]],
      SubCategoryName: ["", [Validators.required]],
      CategoryName: ["", [Validators.required]],
    });
  }

  // Get department list  Api Call
  LoadRevenue() {
    this.http
      .get(
        "http://localhost:8443/admin/budgetRevenue/getBudgetRevenue" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.lstRevenue = data;
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
  addRevenue() {
    if (this.addRevenueForm.invalid) {
      this.markFormGroupTouched(this.addRevenueForm);
      return;
    }
    if (this.addRevenueForm.valid) {
      let purchaseToDateFormat = this.pipe.transform(
        this.addRevenueForm.value.RevenueDate,
        "dd-MM-yyyy"
      );
      let adminId = this.adminId;
      let obj = {
        amount: this.addRevenueForm.value.RevenueName,
        notes: this.addRevenueForm.value.RevenueNotes,
        revenuedate: purchaseToDateFormat,
        subcategoryname: this.addRevenueForm.value.SubCategoryName,
        categoryname: this.addRevenueForm.value.CategoryName,
        adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/budgetRevenue/createBudgetRevenue",
          obj
        )
        .subscribe((data) => {});
      $("#add_revenue").modal("hide");
      this.LoadRevenue();
      this.addRevenueForm.reset();
      this.toastr.success("Budget-revenue added sucessfully...!", "Success");
    }
  }

  editRevenue() {
    if (this.editRevenueForm.valid) {
      this.id = this.editId;

      let obj = {
        amount: this.editRevenueForm.value.RevenueName,
        notes: this.editRevenueForm.value.RevenueNotes,
        revenuedate: this.editRevenueForm.value.RevenueDate,
        subcategoryname: this.editRevenueForm.value.SubCategoryName,
        categoryname: this.editRevenueForm.value.CategoryName,
      };

      this.http
        .patch(
          "http://localhost:8443/admin/budgetRevenue/updateBudgetRevenue" +
            "/" +
            this.id,
          obj
        )
        .subscribe((data1) => {
          this.LoadRevenue();
        });

      $("#edit_categories").modal("hide");
      this.toastr.success("Revenues Updated sucessfully...!", "Success");
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editedvalue = value.amount;
    this.editId = value.id;
    const index = this.lstRevenue.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstRevenue[index];

    this.editRevenueForm.patchValue({
      RevenueName: toSetValues.amount,
      RevenueNotes: toSetValues.notes,
      RevenueDate: toSetValues.revenuedate,
      SubCategoryName: toSetValues.subcategoryname,
      CategoryName: toSetValues.categoryname,
    });
  }

  deleteRevenue() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/budgetRevenue/deleteBudgetRevenue" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.LoadRevenue();
        $("#delete").modal("hide");
        this.toastr.success("Budget-revenue deleted sucessfully..!", "Success");
      });
  }
}

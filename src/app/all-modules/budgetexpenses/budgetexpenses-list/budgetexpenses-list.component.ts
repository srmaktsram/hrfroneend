import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-budgetexpenses-list",
  templateUrl: "./budgetexpenses-list.component.html",
  styleUrls: ["./budgetexpenses-list.component.css"],
})
export class BudgetexpensesListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  public url: any = "budgetexpense";
  public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;
  public addRevenueForm: FormGroup;
  public editRevenueForm: FormGroup;
  public lstRevenue;
  public editedvalue;
  public adminId = sessionStorage.getItem("adminId");
  dataarr: any;
  srch: any[];
  user_type: string;
  accountingwriteFin: string;

  multFile: any;

  accountingwrite: string;
  accountingwriteSub: string;

  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.accountingwrite = sessionStorage.getItem("accountingwrite");
    this.accountingwriteSub = sessionStorage.getItem("accountingwriteSub");
    this.accountingwriteFin = sessionStorage.getItem("accountingwriteFin");
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
        "http://localhost:8443/admin/budgetExpenses/getBudgetExpenses" +
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

  //////////////////////////file select function///////////////////
  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.multFile = event.target.files;
    }
  }
  ///////////////////// download file////////////////////////////
  savePdf(val) {
    var url = `http://localhost:8443/${val}`;

    window.open(url);
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

      var fd = new FormData();
      for (let pdfFile of this.multFile) {
        fd.append("file", pdfFile);
      }

      let params = new HttpParams();
      params = params.set("amount", this.addRevenueForm.value.RevenueName);
      params = params.set("notes", this.addRevenueForm.value.RevenueNotes);
      params = params.set("revenuedate", purchaseToDateFormat);
      params = params.set(
        "subcategoryname",
        this.addRevenueForm.value.SubCategoryName
      );
      params = params.set(
        "categoryname",
        this.addRevenueForm.value.CategoryName
      );
      params = params.set("adminId", this.adminId);

      this.http
        .post(
          "http://localhost:8443/admin/budgetExpenses/createBudgetExpenses?" +
            params,
          fd
        )
        .subscribe((data: any) => {
          console.log(data);
        });
      $("#add_categories").modal("hide");
      this.LoadRevenue();
      this.addRevenueForm.reset();
      this._snackBar.open("Budget-revenue added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  editRevenue() {
    if (this.editRevenueForm.valid) {
      var fd = new FormData();
      for (let pdfFile of this.multFile) {
        fd.append("file", pdfFile);
      }

      let params = new HttpParams();
      params = params.set("amount", this.editRevenueForm.value.RevenueName);
      params = params.set("notes", this.editRevenueForm.value.RevenueNotes);
      params = params.set(
        "revenuedate",
        this.editRevenueForm.value.RevenueDate
      );
      params = params.set(
        "subcategoryname",
        this.editRevenueForm.value.SubCategoryName
      );
      params = params.set(
        "categoryname",
        this.editRevenueForm.value.CategoryName
      );
      params = params.set("adminId", this.adminId);
      params = params.set("id", this.editId);

      this.http
        .patch(
          "http://localhost:8443/admin/budgetExpenses/updateBudgetExpenses?" +
            params,
          fd
        )
        .subscribe((data1: any) => {
          console.log("update data", data1);
          this.LoadRevenue();
        });

      $("#edit_categories").modal("hide");
      this._snackBar.open("Expenses Updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
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
        "http://localhost:8443/admin/budgetExpenses/deleteBudgetExpenses" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.LoadRevenue();
        $("#delete").modal("hide");

        this._snackBar.open("Budget-revenue deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { id } from "src/assets/all-modules-data/id";
declare const $: any;
@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit {
  public url: any = "categories";
  public tempId: any;
  public editId: any;
  public addCategoriesForm: FormGroup;
  public editCategoriesForm: FormGroup;
  public lstCategories;
  public editedvalue;
  adminId: string;
  data1: any;
  user_type: string;
  accountingwriteFin: string;
  accountingwrite: string;
  accountingwriteSub: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.user_type = sessionStorage.getItem("user_type");
    this.accountingwrite = sessionStorage.getItem("accountingwrite");
    this.accountingwriteSub = sessionStorage.getItem("accountingwriteSub");
    this.accountingwriteFin = sessionStorage.getItem("accountingwriteFin");
  }

  ngOnInit() {
    this.LoadCategories();

    this.addCategoriesForm = this.formBuilder.group({
      CategoriesName: ["", [Validators.required]],
      SubCategoriesName: ["", [Validators.required]],
    });

    this.editCategoriesForm = this.formBuilder.group({
      CategoriesName: ["", [Validators.required]],
      SubCategoriesName: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadCategories() {
    this.http
      .get(
        "http://localhost:8443/admin/category/getCategory" + "/" + this.adminId
      )
      .subscribe((data: any) => {
        this.lstCategories = data;
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
  addCategories() {
    if (this.addCategoriesForm.invalid) {
      this.markFormGroupTouched(this.addCategoriesForm);
      return;
    }
    if (this.addCategoriesForm.valid) {
      let obj = {
        categoryname: this.addCategoriesForm.value.CategoriesName,

        adminId: this.adminId,
        subcategoryname: this.addCategoriesForm.value.SubCategoriesName,
      };
      this.http
        .post("http://localhost:8443/admin/category/createCategory", obj)
        .subscribe((data) => {
          this.LoadCategories();
        });

      $("#add_categories").modal("hide");
      this.addCategoriesForm.reset();
      this.toastr.success("Categories added sucessfully...!", "Success");
    }
  }

  editCategories() {
    if (this.editCategoriesForm.valid) {
      let obj = {
        categoryname: this.editCategoriesForm.value.CategoriesName,
        subcategoryname: this.editCategoriesForm.value.SubCategoriesName,
      };
      let id = this.editId;
      this.http
        .patch(
          "http://localhost:8443/admin/category/updateCategory" + "/" + id,
          obj
        )
        .subscribe((data1) => {
          this.LoadCategories();
        });

      $("#edit_categories").modal("hide");
      this.toastr.success("Categories Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editedvalue = value.subcategoryname;
    this.editId = value.id;
    const index = this.lstCategories.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstCategories[index];
    this.editCategoriesForm.setValue({
      CategoriesName: toSetValues.categoryname,
      SubCategoriesName: toSetValues.subcategoryname,
    });
  }
  deleteCategory(value) {
    let id = value.id;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/category/deleteCategory" + "/" + id,
        obj
      )
      .subscribe((data1) => {
        this.LoadCategories();
      });
    $("#delete_category").modal("hide");
    // this.toastr.success("Category deleted", "Success");
  }
}

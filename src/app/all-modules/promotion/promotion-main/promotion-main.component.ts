import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-promotion-main",
  templateUrl: "./promotion-main.component.html",
  styleUrls: ["./promotion-main.component.css"],
})
export class PromotionMainComponent implements OnInit {
  lstPromotion: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "promotionmain";

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;

  public addPromotionForm: FormGroup;
  public editPromotionForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");
  lstDepartment: Object;
  lstDesignation: Object;
  user_type: string;
  promotionWrite: string;
  promotionWriteSub: string;

  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.promotionWrite = sessionStorage.getItem("promotionWrite");
    this.promotionWriteSub = sessionStorage.getItem("promotionWriteSub");
    this.LoadDepartment();
    this.LoadDesignation();
  }
  LoadDepartment() {
    this.http
      .get(
        "http://localhost:8443/admin/department/getAdminData" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.lstDepartment = data;
        // this.dtTrigger.next();
        // this.rows = this.lstDepartment;
        // this.srch = [...this.rows];
      });
  }
  LoadDesignation() {
    this.http
      .get(
        "http://localhost:8443/admin/designation/getData" + "/" + this.adminId
      )
      .subscribe((data) => {
        this.lstDesignation = data;
        // this.dtTrigger.next();

        // this.rows = this.lstDesignation;
        // this.srch = [...this.rows];
      });
  }

  ngOnInit() {
    this.loadPromotion();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addPromotionForm = this.formBuilder.group({
      proFor: ["", [Validators.required]],
      depart: ["", [Validators.required]],
      proFrom: ["", [Validators.required]],
      proTo: ["", [Validators.required]],
      proDate: ["", [Validators.required]],
    });

    this.editPromotionForm = this.formBuilder.group({
      proFor: ["", [Validators.required]],
      depart: ["", [Validators.required]],
      proFrom: ["", [Validators.required]],
      proTo: ["", [Validators.required]],
      proDate: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  trainer Api Call
  loadPromotion() {
    this.http
      .get(
        "http://localhost:8443/admin//promotions/getpromotions" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        this.lstPromotion = data;
        this.rows = this.lstPromotion;
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

  // Add  goal type  Modal Api Call
  addPromotion() {
    if (this.addPromotionForm.invalid) {
      this.markFormGroupTouched(this.addPromotionForm);
      return;
    }
    if (this.addPromotionForm.valid) {
      let promoDate = this.pipe.transform(
        this.addPromotionForm.value.proDate,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addPromotionForm.value.proFor,
        department: this.addPromotionForm.value.depart,
        promotionFrom: this.addPromotionForm.value.proFrom,
        promotionTo: this.addPromotionForm.value.proTo,
        promotionDate: promoDate,
        adminId: this.adminId,
      };
      this.http
        .post("http://localhost:8443/admin/promotions/createPromotions", obj)
        .subscribe((data) => {
          this.loadPromotion();

          $("#datatable").DataTable().clear();
          // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   dtInstance.destroy();
          // });
          // this.dtTrigger.next();
        });

      $("#add_promotion").modal("hide");
      this.addPromotionForm.reset();
      this.toastr.success("Promotion added sucessfully...!", "Success");
    }
  }

  editPromotion() {
    if (this.editPromotionForm.valid) {
      let promoDate = this.pipe.transform(
        this.editPromotionForm.value.proDate,
        "dd-MM-yyyy"
      );
      let id = this.editId;
      let obj = {
        employee: this.editPromotionForm.value.proFor,
        department: this.editPromotionForm.value.depart,
        promotionFrom: this.editPromotionForm.value.proFrom,
        promotionTo: this.editPromotionForm.value.proTo,
        promotionDate: promoDate,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/promotions/updatePromotions" + "/" + id,
          obj
        )
        .subscribe((data1) => {
          this.loadPromotion();

          $("#datatable").DataTable().clear();
          // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   dtInstance.destroy();
          // });
          // this.dtTrigger.next();
        });
      $("#edit_promotion").modal("hide");
      this.toastr.success("Promotion Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstPromotion.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstPromotion[index];
    this.editPromotionForm.setValue({
      proFor: toSetValues.employee,
      depart: toSetValues.department,
      proTo: toSetValues.promotionTo,
      proFrom: toSetValues.promotionFrom,
      proDate: toSetValues.promotionDate,
    });
  }

  deletePromotion() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/promotions/deletePromotions" + "/" + id,
        obj
      )
      .subscribe((data) => {
        this.loadPromotion();

        $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
      });
    $("#delete_promotion").modal("hide");
    this.toastr.success("Promotion  deleted sucessfully..!", "Success");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

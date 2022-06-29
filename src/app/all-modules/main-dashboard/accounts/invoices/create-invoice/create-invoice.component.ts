import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ThemeSettingsComponent } from "src/app/all-modules/settings/theme-settings/theme-settings.component";

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.css"],
})
export class CreateInvoiceComponent implements OnInit {
  public addInvoiceForm: FormGroup;
  public total;
  public invoices;
  public id;
  public allInvoices;
  public invoiceNumber;
  public pipe = new DatePipe("en-US");
  public discount;
  public tax = 5;
  public totalPercentage;
  public percentageTaxValue;
  public percentageDiscountValue;
  public grandTotal;
  public adminId = sessionStorage.getItem("adminId");
  buttondisable = false;
  data: any;
  clientsData: any;
  projects: any;
  invoiceNo: any;
  invErrorMsg: string;
  show = false;
  user_type: string;
  invoiceswrite: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.invoiceNo = sessionStorage.getItem("invoiceNo");
    this.user_type = sessionStorage.getItem("user_type");
    this.invoiceswrite = sessionStorage.getItem("invoiceswrite");


  }
  
  

  ngOnInit() {
    //get id value of invoice list
    this.id = this.route.snapshot.queryParams["id"];
    //add invoive form
    this.addInvoiceForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      number: [this.invoiceNo, [Validators.required]],
      email: ["", [Validators.required]],
      tax: ["", [Validators.required]],
      client_address: ["", [Validators.required]],
      billing_address: ["", [Validators.required]],
      invoice_date: ["", [Validators.required]],
      due_date: ["", [Validators.required]],
      other_information: ["", [Validators.required]],
      invoiceType: [""],
      totalamount: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });
    // this.addInvoiceForm.patchValue({
    //   number: this.invoiceNo,
    // });

    //for adding row
    this.addItems();

    //for get all invoice
    this.getAllInvoices();
  }

  //for adding new array
  get itemsList(): FormArray {
    return this.addInvoiceForm.get("items") as FormArray;
  }
  ///////Get  Invoice Number/////
  // getInvNo() {
  //   this.http
  //     .get("http://localhost:8443/admin/invoices/getOneInvoiceNumber")
  //     .subscribe((res: any) => {
  //       this.invoiceNo = res.number + 1;
  //     });
  // }

  // getting invoice
  getAllInvoices() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/invoiceMainAdmin/getInvoices")
      .subscribe((res) => {
        this.invoices = res;
      });
  }

  newItem(): FormGroup {
    return this.formBuilder.group({
      item: "",
      description: "",
      unit_cost: "",
      qty: "",
      amount: "",
    });
  }

  //for calculating amount
  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.addInvoiceForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.addInvoiceForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.addInvoiceForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.addInvoiceForm.get("grandTotal").setValue(this.grandTotal);
  }

  addItems() {
    this.itemsList.push(this.newItem());
  }

  removeItems(i) {
    this.itemsList.removeAt(i);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  savesend() {
    if (this.addInvoiceForm.invalid) {
      this.markFormGroupTouched(this.addInvoiceForm);
      return;
    } else {
      let invoiceDateFormat = this.pipe.transform(
        this.addInvoiceForm.value.invoice_date,
        "dd-MM-yyyy"
      );
      let dueDateFormat = this.pipe.transform(
        this.addInvoiceForm.value.due_date,
        "dd-MM-yyyy"
      );
      let adminId = sessionStorage.getItem("adminId");
      //  let employeeid=sessionStorage.getItem("employeeid");
      let getItems = this.addInvoiceForm.get("items").value;
      let amount = this.addInvoiceForm.value.totalamount.toString();

      let obj = {
        client: this.addInvoiceForm.value.client,
        number: this.addInvoiceForm.value.number,
        invoice_date: invoiceDateFormat,
        email: this.addInvoiceForm.value.email,
        tax: this.addInvoiceForm.value.tax,
        client_address: this.addInvoiceForm.value.client_address,
        due_date: dueDateFormat,
        billing_address: this.addInvoiceForm.value.billing_address,
        other_information: this.addInvoiceForm.value.other_information,
        invoiceType: "Paid",
        totalamount: amount,
        discount: this.addInvoiceForm.value.discount,
        grandTotal: this.addInvoiceForm.value.grandTotal,
        items: getItems,
      };
      this.http
        .post("http://localhost:8443/mainadmin/invoiceMainAdmin/createInvoices", obj)
        .subscribe((res: any) => {

          if (res.result == 0) {
            this.show = true;
            this.buttondisable = false;
            this.invErrorMsg = "Already exist !";
          } else if (res.result == 1) {
            this.buttondisable = false;
            this.toastr.success("", "Added successfully!");
            this.router.navigate(["/layout/mainadmin/accounts/invoices"]);


            
          }
        });
    }
  }
}

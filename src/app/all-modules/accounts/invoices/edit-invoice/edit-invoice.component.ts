import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

@Component({
  selector: "app-edit-invoice",
  templateUrl: "./edit-invoice.component.html",
  styleUrls: ["./edit-invoice.component.css"],
})
export class EditInvoiceComponent implements OnInit {
  public id;
  public invoiceDetails;
  public invoices;
  public editInvoiceForm: FormGroup;
  public total;
  public pipe = new DatePipe("en-US");
  public editId: any;
  public dateStatus = false;
  public estimateDateFormat;
  public expiryToDateFormat;
  public tax = 5;
  public percentageTaxValue;
  public grandTotal;
  public totalTax;
  public percentageDiscountValue;
  public adminId = sessionStorage.getItem("adminId");
  data: any;
  clientsData: any;
  projects: any;
  invoiceNo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    //getting edit id of selected estimate list

    this.id = this.route.snapshot.queryParams["id"];
    this.getInvoice();
    this.getClients();
    this.getProjects();
    // this.getInvNo();
  }
  getClients() {
    this.http
      .get(
        "http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId
      )
      .subscribe((res: any) => {
        this.data = res;
      });
  }
  getProjects() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminproject" +
        "/" +
        this.adminId
      )
      .subscribe((data: any) => {
        this.projects = data;
      });
  }
  // getInvNo() {
  //   let id = this.id;

  //   this.http
  //     .get("http://localhost:8443/admin/invoices/getOneInvoices" + "/" + id)
  //     .subscribe((res: any) => {
  //       this.invoiceNo = res.data.number;
  //       this.edit();
  //     });
  // }

  ngOnInit() {
    //editestimate form value
    this.editInvoiceForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      number: ["", [Validators.required]],
      project: ["", [Validators.required]],
      tax: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      client_address: ["", [Validators.required]],
      billing_address: ["", [Validators.required]],
      invoice_date: ["", [Validators.required]],
      due_date: ["", [Validators.required]],
      other_information: ["", [Validators.required]],
      status: [""],
      totalamount: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });
    //get estimates

    //adding items
    this.addItems();
  }

  // get method for estimate
  getInvoice() {
    let id = this.id;

    this.http
      .get("http://localhost:8443/admin/invoices/getOneInvoices" + "/" + id)
      .subscribe((res: any) => {
        this.invoiceDetails = res.data;
        //passing edit id

        this.edit();
      });
  }

  //for adding new rows
  get itemsList(): FormArray {
    return this.editInvoiceForm.get("items") as FormArray;
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

  addItems() {
    this.itemsList.push(this.newItem());
  }

  //for calculating changing price
  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.editInvoiceForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.editInvoiceForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.editInvoiceForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.editInvoiceForm.get("grandTotal").setValue(this.grandTotal);
  }

  // to know the date picker changes
  selected(data) {
    this.dateStatus = data;
  }

  // for edit data using update method
  savesend() {
    if (!this.editInvoiceForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let params = this.editInvoiceForm.value;
      params["status"] = 0;
      params["id"] = 2;
      if (this.dateStatus) {
        this.estimateDateFormat = this.pipe.transform(
          this.editInvoiceForm.value.invoice_date,
          "dd-MM-yyyy"
        );
        this.expiryToDateFormat = this.pipe.transform(
          this.editInvoiceForm.value.due_date,
          "dd-MM-yyyy"
        );
      } else {
        this.estimateDateFormat = this.editInvoiceForm.value.invoice_date;
        this.expiryToDateFormat = this.editInvoiceForm.value.due_date;
      }

      let getItems = this.editInvoiceForm.get("items").value;
      let amount = this.editInvoiceForm.value.totalamount.toString();
      let id = this.editId;
      let obj = {
        client: this.editInvoiceForm.value.client,
        number: this.editInvoiceForm.value.number,
        project: this.editInvoiceForm.value.project,
        invoice_date: this.estimateDateFormat,
        email: this.editInvoiceForm.value.email,
        tax: this.editInvoiceForm.value.tax,
        client_address: this.editInvoiceForm.value.client_address,
        due_date: this.expiryToDateFormat,
        billing_address: this.editInvoiceForm.value.billing_address,
        other_information: this.editInvoiceForm.value.other_information,
        // status: "Pending",
        totalamount: amount,
        discount: this.editInvoiceForm.value.discount,
        grandTotal: this.editInvoiceForm.value.grandTotal,
        // id: this.id,
        items: getItems,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/invoices/updateInvoices" + "/" + this.id,
          obj
        )
        .subscribe((res) => {
          this.router.navigate(["/layout/accounts/invoices"]);
          this.toastr.success("", "Edited successfully!");
        });
    }
  }

  //remove row from table
  removeItems(i) {
    this.itemsList.removeAt(i);
  }

  // set values to form
  edit() {
    this.editInvoiceForm.patchValue({
      client: this.invoiceDetails.client,
      number: this.invoiceDetails.number,
      project: this.invoiceDetails.project,
      email: this.invoiceDetails.email,
      tax: this.invoiceDetails.tax,
      client_address: this.invoiceDetails.client_address,
      billing_address: this.invoiceDetails.billing_address,
      invoice_date: this.invoiceDetails.invoice_date,
      due_date: this.invoiceDetails.due_date,
      other_information: this.invoiceDetails.other_information,
      status: this.invoiceDetails.status,
      totalamount: this.invoiceDetails.totalamount,
      discount: this.invoiceDetails.discount,
      grandTotal: this.invoiceDetails.grandTotal,
      items: this.invoiceDetails.items,
    });
  }
}

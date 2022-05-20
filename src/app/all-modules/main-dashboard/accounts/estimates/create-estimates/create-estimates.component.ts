import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-create-estimates",
  templateUrl: "./create-estimates.component.html",
  styleUrls: ["./create-estimates.component.css"],
})
export class CreateEstimatesComponent implements OnInit {
  public estimate;
  public addEstimateForm: FormGroup;
  public id;
  public allEstimates = [];
  public total;
  public pipe = new DatePipe("en-US");
  public discount;
  public tax = 5;
  public totalPercentage;
  public percentageTaxValue;
  public percentageDiscountValue;
  public grandTotal;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //get id value of estimation list
    this.id = this.route.snapshot.queryParams["id"];

    // add estimation form value
    this.addEstimateForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tax: ["", [Validators.required]],
      client_address: ["", [Validators.required]],
      billing_address: ["", [Validators.required]],
      estimate_date: ["", [Validators.required]],
      expiry_date: ["", [Validators.required]],
      other_information: [""],
      status: [""],
      totalamount: ["", [Validators.required]],
      discount: [""],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });

    //adding new rows to table
    this.addItems();
    //get estimation
    // this.getEstimate();
  }

  //getting estimate
  // getEstimate() {
  //   this.allModulesService.get("estimates").subscribe((res) => {
  //     this.allEstimates = res;
  //   });
  // }

  //for adding new array

  get itemsList(): FormArray {
    return this.addEstimateForm.get("items") as FormArray;
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

  //for calculating price values

  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.addEstimateForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.addEstimateForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.addEstimateForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.addEstimateForm.get("grandTotal").setValue(this.grandTotal);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }



  //post method function for estimate form

  savesend() {
    if(this.addEstimateForm.invalid){
      this.markFormGroupTouched(this.addEstimateForm)
      return
    }
    if (!this.addEstimateForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let estimateDateFormat = this.pipe.transform(
        this.addEstimateForm.value.estimate_date,
        "dd-MM-yyyy"
      );
      let expiryToDateFormat = this.pipe.transform(
        this.addEstimateForm.value.expiry_date,
        "dd-MM-yyyy"
      );
      let getItems = this.addEstimateForm.get("items").value;
    
      console.log(getItems)
      let amount = this.addEstimateForm.value.totalamount.toString();
      let obj = {
        adminId:sessionStorage.getItem("adminId"),
        estimateNumber: "EST-0001",
        client: this.addEstimateForm.value.client,
        project: this.addEstimateForm.value.project,
        estimateDate: estimateDateFormat,
        email: this.addEstimateForm.value.email,
        tax: this.addEstimateForm.value.tax,
        clientAddress: this.addEstimateForm.value.client_address,
        expiryDate: expiryToDateFormat,
        billingAddress: this.addEstimateForm.value.billing_address,
        otherInformation: this.addEstimateForm.value.other_information,
        grandTotal:this.addEstimateForm.value.grandTotal,
        status: "Declined",
        totalAmount: this.addEstimateForm.value.amount,
        discount: this.addEstimateForm.value.discount,
        
        items:getItems
      };
      this.http.post("http://localhost:8443/admin/estimates/createEstimate",obj).subscribe((res) => {
        console.log(res);
        this.toastr.success("", "Added successfully!");
        this.router.navigate(["/layout/accounts/estimates"]);
      });
    }
  }

  //removing rows from table

  removeItems(i) {
    this.itemsList.removeAt(i);
  }
}

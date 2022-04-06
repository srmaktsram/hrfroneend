import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-edit-estimate",
  templateUrl: "./edit-estimate.component.html",
  styleUrls: ["./edit-estimate.component.css"],
})
export class EditEstimateComponent implements OnInit {
  public id;
  public allEstimates=[];
  public editEstimateForm: FormGroup;
  public total;
  public pipe = new DatePipe("en-US");
  public editId: any;
  public dateStatus: boolean = false;
  public estimateDateFormat;
  public expiryToDateFormat;
  public tax = 5;
  public percentageTaxValue;
  public grandTotal;
  public totalTax;
  public percentageDiscountValue;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //getting edit id of selected estimate list
    // this.id = this.route.snapshot.queryParams["id"];
    // console.log("ngOnInit pe Id",this.id)

    //editestimate form value
    this.editEstimateForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: [""],
      email: [""],
      tax: [""],
      client_address: [""],
      billing_address: [""],
      estimate_date: [""],
      expiry_date: [""],
      other_information: [""],
      status: [],
      totalamount: "",
      discount: [""],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });
    //get estimates
    this.getEstimate();

    //adding items
    this.addItems();
  }

  // get method for estimate
  getEstimate() {
    let id=this.id
    console.log("this is get method ",id)
    this.http.get("http://localhost:8443/admin/estimates/getEstimate"+"/"+this.id).subscribe((res:any) => {
      this.allEstimates = (res);
  
      //passing edit id

      this.edit(id);
    });
  }

  //for adding new rows
  get itemsList(): FormArray {
    return this.editEstimateForm.get("items") as FormArray;
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
    this.editEstimateForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.editEstimateForm.get("totalamount").setValue(total);

    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.editEstimateForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.editEstimateForm.get("grandTotal").setValue(this.grandTotal);
  }

  // to know the date picker changes
  selected(data) {
    this.dateStatus = data;
  }

  // for edit data using update method
  savesend() {
    if (!this.editEstimateForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let params = this.editEstimateForm.value;
      params["status"] = 0;
      params["id"] = 2;
      if (this.dateStatus) {
        this.estimateDateFormat = this.pipe.transform(
          this.editEstimateForm.value.estimate_date,
          "dd-MM-yyyy"
        );
        this.expiryToDateFormat = this.pipe.transform(
          this.editEstimateForm.value.expiry_date,
          "dd-MM-yyyy"
        );
      } else {
        this.estimateDateFormat = this.editEstimateForm.value.estimate_date;
        this.expiryToDateFormat = this.editEstimateForm.value.expiry_date;
      }

      let getItems = this.editEstimateForm.get("items").value;
      let amount = this.editEstimateForm.value.totalamount.toString();
      let obj = {
        number: "EST-0001",
        client: this.editEstimateForm.value.client,
        project: this.editEstimateForm.value.project,
        estimate_date: this.estimateDateFormat,
        email: this.editEstimateForm.value.email,
        tax: this.editEstimateForm.value.tax,
        client_address: this.editEstimateForm.value.client_address,
        expiry_date: this.expiryToDateFormat,
        billing_address: this.editEstimateForm.value.billing_address,
        other_information: this.editEstimateForm.value.other_information,
        status: "Declined",
        totalamount: amount,
        id: this.id,
        discount: this.editEstimateForm.value.discount,
        grandTotal: this.editEstimateForm.value.grandTotal,
        items: [
          {
            item: getItems[0].item,
            description: getItems[0].description,
            unit_cost: getItems[0].unit_cost,
            qty: getItems[0].qty,
            amount: getItems[0].amount,
          },
        ],
      };

      this.http.patch("http://localhost:8443/admin/estimates/updateEstimates"+"/"+this.id,obj).subscribe((res) => {
        this.toastr.success("", "Edited successfully!");
        this.router.navigate(["/accounts/estimates"]);
      });
    }
  }

  //remove row from table
  removeItems(i) {
    this.itemsList.removeAt(i);
  }

  // set values to form
  edit(value) {
    this.editId = value;
    // console.log("edit function ke andarr",this.editId)
    // const index = this.allEstimates.findIndex((item) => {
    //   return item.id === value;
    // });
    // console.log("edit function ke andarr",index)
    let toSetValues:any = this.allEstimates;
    // console.log("to setValue in edit function",toSetValues)
    this.editEstimateForm.patchValue({
      client: toSetValues.client,
      project: toSetValues.project,
      email: toSetValues.email,
      tax: toSetValues.tax,
      client_address: toSetValues.clientAddress,
      billing_address: toSetValues.billingAddress,
      estimate_date: toSetValues.estimateDate,
      expiry_date: toSetValues.expiryDate,
      other_information: toSetValues.otherInformation,
      status: toSetValues.status,
      totalamount: toSetValues.amount,
      discount: toSetValues.discount,
      grandTotal: toSetValues.grandTotal,
      items:toSetValues.items
      // [
      //   {
      //     item: toSetValues.items[0].item,
      //     description: toSetValues.items[0].description,
      //     unit_cost: toSetValues.items[0].unit_cost,
      //     qty: toSetValues.items[0].qty,
      //     amount: toSetValues.items[0].amount,
      //   },
      // ],
    });
  }
}

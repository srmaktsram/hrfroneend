import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-bank-settings",
  templateUrl: "./bank-settings.component.html",
  styleUrls: ["./bank-settings.component.css"],
})
export class BankSettingsComponent implements OnInit {
  public bankSettings: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    console.log(
      sessionStorage.getItem("affiliateId"),
      "------------------------->"
    );
    this.bankSettings = this.formBuilder.group({
      bankName: ["", [Validators.required]],
      branchName: ["", [Validators.required]],
      accountHolderName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      ifsc: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });
    this.getBankDetails();
  }

  getBankDetails() {
    this.http
      .get(
        "http://localhost:8443/affiliate/settings/getBankDetails" +
          "/" +
          sessionStorage.getItem("affiliateId")
      )
      .subscribe((response: any) => {
        let res: any = response.data;
        this.bankSettings.patchValue({
          bankName: res.bankName,
          branchName: res.branchName,
          accountHolderName: res.accountHolderName,
          accountNumber: res.accountNumber,
          ifsc: res.ifsc,
          phone: res.phone,
          email: res.email,
        });
      });
  }
  updateBankDetails() {
    console.log(this.bankSettings.value, "--------------->>>");
    let obj = {
      bankName: this.bankSettings.value.bankName,
      branchName: this.bankSettings.value.branchName,
      accountHolderName: this.bankSettings.value.accountHolderName,
      accountNumber: this.bankSettings.value.accountNumber,
      ifsc: this.bankSettings.value.ifsc,
      phone: this.bankSettings.value.phone,
      email: this.bankSettings.value.email,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliate/settings/updateBankDetails" +
          "/" +
          sessionStorage.getItem("affiliateId"),
        { obj }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.getBankDetails();
      });
  }
}

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
  selector: "app-profile-settings",
  templateUrl: "./profile-settings.component.html",
  styleUrls: ["./profile-settings.component.css"],
})
export class ProfileSettingsComponent implements OnInit {
  public profileSettings: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    console.log(
      sessionStorage.getItem("affiliateId"),
      "------------------------->"
    );
    this.profileSettings = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
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
        this.profileSettings.patchValue({
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
    console.log(this.profileSettings.value, "--------------->>>");
    let obj = {
      bankName: this.profileSettings.value.bankName,
      branchName: this.profileSettings.value.branchName,
      accountHolderName: this.profileSettings.value.accountHolderName,
      accountNumber: this.profileSettings.value.accountNumber,
      ifsc: this.profileSettings.value.ifsc,
      phone: this.profileSettings.value.phone,
      email: this.profileSettings.value.email,
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

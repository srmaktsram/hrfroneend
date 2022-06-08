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
  selector: "app-company-settings",
  templateUrl: "./company-settings.component.html",
  styleUrls: ["./company-settings.component.css"],
})
export class CompanySettingsComponent implements OnInit {
  public companySettings: FormGroup;
  current_location: any;
  companyEmail: string;
  companySite: string;
  companyName: string;
  phone: string;
  mobile: string;
  companyAddress: string;
  adminId: string;
  fax: string;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );
    this.adminId = sessionStorage.getItem("adminId");
    this.companyName = sessionStorage.getItem("companyName");
    this.companyEmail = sessionStorage.getItem("companyEmail");
    this.companySite = sessionStorage.getItem("companySite");
    this.companyAddress = sessionStorage.getItem("companyAddress");
    this.phone = sessionStorage.getItem("phone");
    this.mobile = sessionStorage.getItem("mobile");
    this.fax = sessionStorage.getItem("fax");
  }

  ngOnInit() {
    console.log(this.current_location);

    this.companySettings = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      contactPerson: ["", [Validators.required]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      fax: [""],
      website: ["", [Validators.required]],
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
  submitCompany() {
    if (this.companySettings.invalid) {
      this.markFormGroupTouched(this.companySettings);
      return;
    } else if (this.companySettings.valid) {
      let obj = this.companySettings.value;

      console.log("new details", obj);
      this.http
        .patch(
          "http://localhost:8443/admin/companysetting/updateCompanyDetails" +
            "/" +
            this.adminId,
          obj
        )
        .subscribe((res: any) => {
          console.log("---->>>>>>>>>>>>>>>>>>>", res);
          sessionStorage.setItem("companyEmail", res.companyEmail);
          sessionStorage.setItem("companyName", res.companyName);
          sessionStorage.setItem("phone", res.phone);
          sessionStorage.setItem("mobile", res.mobile);
          sessionStorage.setItem("companySite", res.companySite);
          sessionStorage.setItem("fax", res.fax);
          sessionStorage.setItem("companyAddress", res.companyAddress);
          sessionStorage.setItem(
            "current_location",
            JSON.stringify(res.location)
          );
        });
      window.location.reload();
      this.toastr.success("Company Details Updated Sucessfully", "Success");
    }
  }
}

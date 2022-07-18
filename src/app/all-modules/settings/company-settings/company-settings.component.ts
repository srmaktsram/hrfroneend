import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

@Component({
  selector: "app-company-settings",
  templateUrl: "./company-settings.component.html",
  styleUrls: ["./company-settings.component.css"],
})
export class CompanySettingsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
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
    private http: HttpClient,
    private _snackBar: MatSnackBar
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
      contactPerson: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      phoneNumber: ["", [Validators.required]],
      mobileNumber: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
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
      // window.location.reload();
      this._snackBar.open("Company Details updated sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}

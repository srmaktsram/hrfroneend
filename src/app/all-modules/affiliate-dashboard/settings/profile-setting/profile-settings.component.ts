import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

@Component({
  selector: "app-profile-settings",
  templateUrl: "./profile-settings.component.html",
  styleUrls: ["./profile-settings.component.css"],
})
export class ProfileSettingsComponent implements OnInit {
  public profileSettings: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.profileSettings = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      lastName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      state: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      city: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      pinCode: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.getprofileDetails();
  }

  getprofileDetails() {
    this.http
      .get(
        "http://localhost:8443/affiliates/settings/getProfileDetails" +
        "/" +
        sessionStorage.getItem("affiliateId")
      )
      .subscribe((data: any) => {
        let res: any = data;

        this.profileSettings.patchValue({
          firstName: res.first_name,
          lastName: res.last_name,
          address: res.address,
          country: res.country,
          state: res.state,
          city: res.city,
          pinCode: res.zip,
          email: res.email,
          phone: res.phone,
        });
      });
  }
  updateProfileDetails() {
    let obj = {
      first_name: this.profileSettings.value.firstName,
      last_name: this.profileSettings.value.lastName,
      address: this.profileSettings.value.address,
      country: this.profileSettings.value.country,
      state: this.profileSettings.value.state,
      city: this.profileSettings.value.city,
      zip: this.profileSettings.value.pinCode,
      email: this.profileSettings.value.email,
      phone: this.profileSettings.value.phone,
    };
    this.http
      .patch(
        "http://localhost:8443/affiliates/settings/updateProfileDetails" +
        "/" +
        sessionStorage.getItem("affiliateId"),
        obj
      )
      .subscribe((res: any) => {
        this.getprofileDetails();
      });
  }
}

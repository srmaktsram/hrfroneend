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
        let res: any =data;
        
        this.profileSettings.patchValue({
          firstName: res.first_name,
          lastName:  res.last_name,
          address:  res.address,
          country:  res.country,
          state:  res.state,
          city:  res.city,
          pinCode:  res.zip,
          email:  res.email,
          phone:  res.phone,
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

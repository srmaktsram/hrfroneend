import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

// import { WebStorage } from "src/app/core/storage/web.storage";
// import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;
  public showOne = false;
  public showTwo = true;
  public showThree = true;
  form = new FormGroup({
    companyName: new FormControl("", [Validators.required]),
    companySite: new FormControl("", [Validators.required]),
    companyEmail: new FormControl("", [Validators.required]),
    companyAddress: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    pinCode: new FormControl("", [Validators.required]),

    mobile: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),

    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
  });
  disable = false;
  error: string;
  ipAddress: any;
  currentAddress: Object;
  location: Object;

  get f() {
    return this.form.controls;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getip();
  }
  getip() {
    this.http
      .get("https://jsonip.com")
      .pipe(
        switchMap((value: any) => {
          this.ipAddress = value.ip;
          let url = `https://ipapi.co/${value.ip}/json/`;
          return this.http.get(url);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.location = data;
      });
  }
  submit() {
    if (this.form.valid) {
      if (this.form.value.password != this.form.value.confirmPassword) {
        this.isvalidconfirmpassword = true;
      } else {
        this.isvalidconfirmpassword = false;
        this.saveData();
      }
    }
  }
  saveData() {
    let companyName = this.form.value.companyName;
    let companySite = this.form.value.companySite;
    let companyEmail = this.form.value.companyEmail;
    let companyAddress = this.form.value.companyAddress;
    let phone = this.form.value.phone;
    let pinCode = this.form.value.pinCode;
    let mobile = this.form.value.mobile;
    let name = this.form.value.name;
    let role = this.form.value.role;
    let address = this.form.value.address;
    let email = this.form.value.email;
    let code = this.form.value.code;
    let username = this.form.value.userName;
    let password = this.form.value.password;
    let confirmPassword = this.form.value.confirmPassword;
    let location = this.location;
    let status="Demo"
    console.log(
      companyName,
      companySite,
      companyEmail,
      companyAddress,
      phone,
      pinCode,
      mobile,
      name,
      role,
      address,
      email,
      code,
      username,
      password,
      location,
      status
    );
    this.http
      .post("http://localhost:8443/auth/register/createUser", {
        companyName,
        companySite,
        companyEmail,
        companyAddress,
        phone,
        pinCode,
        mobile,
        name,
        role,
        address,
        email,
        code,
        username,
        password,
        location,
        status
      })
      .subscribe((response: any) => {
        console.log("result", response);
      });
  }
  hideShow() {
    if (
      this.form.value.pinCode != "" &&
      this.form.value.companyName != "" &&
      this.form.value.companyAddress != "" &&
      this.form.value.companyEmail != "" &&
      this.form.value.companySite != "" &&
      this.form.value.phone != ""
    ) {
      this.showOne = true;
      this.showThree = true;
      this.showTwo = false;
    } else {
      this.disable = false;
      this.error = "please fill the given field";
    }
  }
  hideShowOne() {
    if (
      this.form.value.code != "" &&
      this.form.value.name != "" &&
      this.form.value.address != "" &&
      this.form.value.email != "" &&
      this.form.value.mobile != "" &&
      this.form.value.role != ""
    ) {
      this.showOne = true;
      this.showTwo = true;
      this.showThree = false;
    } else {
      this.disable = false;
      this.error = "please fill the given field";
    }
  }
  finalError() {
    if (!this.form.valid) {
      this.disable = false;
      this.error = "please fill the given field";
    }
  }
}

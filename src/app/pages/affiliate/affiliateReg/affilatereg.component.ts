import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-affilatereg",
  templateUrl: "./affilatereg.component.html",
  styleUrls: ["./affilatereg.component.scss"],
})
export class AffilateRegComponent implements OnInit {
  public ipAddress: any;
  public sendOtpBtn = true;
  public reSendOtpBtn = false;
  public pass_error: any;
  public dataNew: any;
  public myTimeout: any;
  public otpCode: number;
  public saveBtn = true;
  public emailBtn = false;
  public reSendOtp = "sendOtp";
  public otpBtn = true;
  public verifyShow = false;
  public showVerify = true;
  public setTimer: any;
  public currentTime: any;
  public pastTime: any;
  public advertiseType: any;
  public pass_error_hide: any;
  otpmessage = true;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    first_name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    state: new FormControl(""),
    job_title: new FormControl(""),

    company: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    zip: new FormControl("", [Validators.required, Validators.minLength(2)]),
    city: new FormControl("", [Validators.required, Validators.minLength(2)]),
    country: new FormControl([Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    website: new FormControl(""),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    check: new FormControl("", [Validators.required]),
  });

  genrate(length) {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const genratePass = result.trim();

    this.dataNew = genratePass;
  }

  get first_name() {
    return this.registerForm.get("first_name");
  }

  get last_name() {
    return this.registerForm.get("last_name");
  }
  get address() {
    return this.registerForm.get("address");
  }

  get city() {
    return this.registerForm.get("city");
  }

  get country() {
    return this.registerForm.get("country");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get company() {
    return this.registerForm.get("company");
  }

  get zip() {
    return this.registerForm.get("zip");
  }
  get phone() {
    return this.registerForm.get("phone");
  }

  get website() {
    return this.registerForm.get("website");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get check() {
    return this.registerForm.get("check");
  }

  checkPass() {
    if (
      this.registerForm.value.password !=
      this.registerForm.value.confirmPassword
    ) {
      //console.log(this.registerForm.value.password,this.registerForm.value.confirmPassword)
      if (
        this.registerForm.value.password.length >= 6 &&
        this.registerForm.value.confirmPassword.length >= 6
      ) {
        this.pass_error = "Password and confirm password does not match.";

        this.pass_error_hide = false;
        return false;
      }
    } else {
      this.pass_error_hide = true;
    }
  }

  /////////otp verify./////////////////

  otpVer(val) {
    if (val == this.otpCode) {
      this.myStopFunction();
      //
      this.saveBtn = false;
      this.verifyShow = true;
      this.showVerify = false;
    } else {
      this.otpmessage = false;
      this.saveBtn = true;
    }
  }

  //////send otp/////////////////////////////////

  //  myStopFunction() {
  //   clearTimeout(this.myTimeout);
  // }
  myStopFunction() {
    clearTimeout(this.myTimeout);
  }

  sendOtp(val) {
    this.myTimeout = setTimeout(async () => {
      this.otpCode = 0;
      this.sendOtpBtn = false;
      this.reSendOtpBtn = true;
      this.myStopFunction();
    }, 60 * 1000);

    if (val.length > 9) {
      this.emailBtn = true;
      this.otpBtn = false;

      this.otpCode = Math.floor(1000 + Math.random() * 9000);

      console.log(
        "this is set timer",
        this.setTimer,
        " the OTP>>>>> ",
        this.otpCode
      );

      let code = this.otpCode;
      this.http
        .post("http://localhost:8443/mainadmin/affiliate/sendOTP", {
          email: val,
          otp: code,
        })
        .subscribe((res: any) => {});
    }
  }

  userLogin() {
    // console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);

      var obj = {
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.last_name,
        company: this.registerForm.value.company,

        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        country: this.registerForm.value.country,
        city: this.registerForm.value.city,
        state: this.registerForm.value.state,
        zip: this.registerForm.value.zip,
        address: this.registerForm.value.address,
        password: this.registerForm.value.password,
        job_title: this.registerForm.value.job_title,
        status: "Pending",
      };
    }
    this.http
      .post("http://localhost:8443/mainadmin/affiliate/create", obj)
      .subscribe((response: any) => {
        console.log(response);
        this.resetForm();
      });
  }

  resetForm() {
    this.router.navigate(["/login/affiliatelogin"]);
  }
}

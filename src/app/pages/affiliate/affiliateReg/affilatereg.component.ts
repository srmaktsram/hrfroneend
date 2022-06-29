import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
  public registerForm: FormGroup;
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      last_name: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      company: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      email: ['', [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(2), WhiteSpaceValidator.noWhiteSpace]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      job_title: ['', [Validators.required]],

    })

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
        .subscribe((res: any) => { });
    }
  }

  userLogin() {

    if (this.registerForm.valid) {
      alert("called")
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
    console.log(obj, "l;dklj///////////////")
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

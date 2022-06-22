import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
// import { WebStorage } from "src/app/core/storage/web.storage";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.css"],
})
export class ForgotComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  public CustomControler: any;
  public newOtp: any;
  public subscription: Subscription;
  public otpIs: any;
  public sendOtpBox = false;
  public verifyOtpBox = true;
  public resetPasswordBox = true;
  public messOtp: any;
  public matchPass = true;
  sendOtpDisable = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }
  get f() {
    return this.form.controls;
  }
  ngOnInit() { }
  submit() {
    this.CustomControler = 0;
    // this.storage.Forgotpassword(this.form.value);
  }
  sendOtp(val) {
    this.http
      .patch("http://localhost:8443/auth/register/sendOtpInEmail", {
        email: val,
      })
      .subscribe((res: any) => {
        this.newOtp = res.OTP;
        this.sendOtpDisable = false;
        if (this.newOtp) {
          let otp = this.newOtp;
          console.log(otp);
          var now = new Date();
          var time = now.getTime();
          var expiryTime = time + 30000;
          now.setTime(expiryTime);
          this.cookieService.set("otp", otp, { expires: now });
          this.cookieService.set("loginEmail", res.companyEmail);
          this.sendOtpBox = true;
          this.verifyOtpBox = false;
          this.resetPasswordBox = true;
        }
      });
  }
  verifyOtp(otpInput) {
    let OTP = this.cookieService.get("otp");
    if (otpInput === OTP) {
      this.sendOtpBox = true;
      this.verifyOtpBox = true;
      this.resetPasswordBox = false;
    } else {
      this.messOtp = " Invalid Otp......";
    }
  }

  resetPassword(val1, val2) {
    // let otpcode = this.cookieService.get("otp");
    let email = this.cookieService.get("loginEmail");
    let pass1 = val1;
    let pass2 = val2;

    if (pass1 === pass2) {
      var obj = {
        email: email,
        password: pass1,
      };
      this.http
        .patch("http://localhost:8443/auth/register/forgetPassword", obj)
        .subscribe((res: any) => {
          this.router.navigate(["/login/adminlogin"]);
        });
    } else {
      this.matchPass = false;
    }
  }
}

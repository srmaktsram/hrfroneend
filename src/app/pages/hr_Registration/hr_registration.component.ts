import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";


@Component({
  selector: "app-hr_registration",
  templateUrl: "./hr_registration.component.html",
  styleUrls: ["./hr_registration.component.css"],

})
export class HrregistrationComponent implements OnInit {

  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public registerForm: FormGroup;
  public resetForm: FormGroup;
  public changePassForm: FormGroup;
  public signIn: any;
  public signUp: any;
  public showEmail = false;
  public veryfyOtp = true;
  public addloginForm: FormGroup;
  public showRegister = false;
  public showLogin = true;
  public showForgot = true;
  public changePass = true;
  public otp: any;
  public messOtp: any;
  isvalidconfirmpassword: boolean;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private hrUserAuthenticationService: HrUserAuthenticationService, private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private cookieService: CookieService,
  ) {

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      securityQues: ["", [Validators.required]],
      securityAns: ["", [Validators.required]],
    })

    this.addloginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],

    })
    this.route.queryParams
      .subscribe(params => {
        this.signIn = params.signIn;
        console.log(this.signIn, "///////////////////////<<<<<<<<<<<<<<<");
      })


    this.resetForm = this.formBuilder.group({
      verifiedEmail: ["", Validators.required],
      otp: ["", Validators.required],

    })

    this.changePassForm = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    })
    this.showPage()
  }

  showPage() {
    if (this.signIn == 'signIn') {
      this.showLogin = false;
      this.showRegister = true;
    }
    else if (this.signIn == 'signUp') {
      this.showLogin = true;
      this.showRegister = false;
    }
  }

  showData() {
    let temp: any;
    temp = this.showRegister
    this.showRegister = this.showLogin;
    this.showLogin = temp;
  }

  registerUsers() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
        this.isvalidconfirmpassword = true;
      } else {
        this.isvalidconfirmpassword = false;
        this.saveData();
      }
    }
  }

  saveData() {
    let obj = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      gender: this.registerForm.value.gender,
      securityQues: this.registerForm.value.securityQues,
      securityAns: this.registerForm.value.securityAns,
    }
    this.http.post("http://localhost:8443/mainadmin/create/registration", obj).subscribe((res: any) => {
      console.log(res, "res>>>>>>>>KKKKKKKKKKKK")
      window.location.replace("http://localhost:4200")
      this.hrUserAuthenticationService.login(
        res.id,
        res.corporateId,
        res.email,
        res.firstName,
        res.lastName,
        res.phone,
      );
    })
  }

  userLogin() {
    let email = this.addloginForm.value.email;
    let password = this.addloginForm.value.password;
    this.http
      .post("http://localhost:8443/mainadmin/create/log-in", {
        email,
        password,
      })
      .subscribe((res: any) => {
        console.log(res, ">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<")
        if (res.result == 2) {
          window.location.replace("http://localhost:4200")

          this.hrUserAuthenticationService.login(
            res.data.id,
            res.data.corporateId,
            res.data.email,
            res.data.firstName,
            res.data.lastName,
            res.data.phone,
          );

        } else {
          alert("wrong Id or pass");
        }
      });
  }

  showForgotPassword() {
    this.showForgot = false;
    this.showLogin = true;
    this.showEmail = false;
    this.veryfyOtp = true;
  }

  sendOtp() {
    let email = this.resetForm.value.verifiedEmail
    console.log(email, "kj..........<<<<<<<<<<<<<<>>>>>>>>>>>")
    this.http.post("http://localhost:8443/mainadmin/hr_user/sendOtp", { email }).subscribe((res: any) => {
      console.log(res, "postApi====XXXXXXXXXXXXXXXXXXXX")
      this.otp = res.otp;
      if (this.otp) {
        let date = new Date();
        let time = date.getTime();
        let expairyTime = time + 120000;
        date.setTime(expairyTime);
        this.cookieService.set("otp", this.otp, { expires: date });
        this.cookieService.set("loginEmail", res.email);
        this.veryfyOtp = false;
        this.showEmail = true;
      }
    })

  }
  showVeryfyOtp() {

    let OTP = this.cookieService.get("otp");
    let otpInput = this.resetForm.value.otp;
    if (otpInput === OTP) {
      this.changePass = false;
      this.showForgot = true;
    } else {
      this.messOtp = " Invalid Otp......";
    }
  }
  openSnackBar() {
    if (this.changePassForm.valid) {
      if (this.changePassForm.value.password == this.changePassForm.value.confirmPassword) {
        this.showLogin = false;
        this.changePass = true;
        this._snackBar.open('Password Changed Successfully', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });

        let email = this.resetForm.value.verifiedEmail;
        let password = this.changePassForm.value.password;
        let confirmPassword = this.changePassForm.value.confirmPassword;

        if (password === confirmPassword) {
          this.http.patch("http://localhost:8443/mainadmin/hr_users/changePassword", { email, password }).subscribe((res: any) => {
            console.log(res, "whatEver>>>>>>>>>>>>>>>>>>>....")
          })
        }

      }
    }
  }
}







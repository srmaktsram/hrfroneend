import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminAuthenticationService } from "src/app/core/storage/authentication-admin.service";

@Component({
  selector: "app-hr_registration",
  templateUrl: "./hr_registration.component.html",
  styleUrls: ["./hr_registration.component.css"],

})
export class HrregistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public addloginForm: FormGroup;
  public showRegister = false;
  public showLogin = true;
  isvalidconfirmpassword: boolean;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private adminAuthenticationService: AdminAuthenticationService) { }

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
    console.log(obj, "mmmmmmmmmmtesti h bhai ji")
    this.http.post("http://localhost:8443/mainadmin/create/registration", obj).subscribe((res: any) => {
      console.log("postApi", res)

    })

  }
  userLogin() {
    let email = this.addloginForm.value.email;
    let password = this.addloginForm.value.password;

    console.log("EEEEEE", email, "PPPPPPP", password)

    this.http
      .post("http://localhost:8443/mainadmin/create/log-in", {
        email,
        password,
      })
      .subscribe((res: any) => {

        this.router.navigate(["/pages/pricing"]);
      });

  }



}




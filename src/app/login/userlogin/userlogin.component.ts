import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/storage/authentication.service";

@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.css"],
})
export class UserLoginComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  sendTo() {
    this.router.navigate(["/login/forgot"]);
  }
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  submit() {
    let userId = this.form.value.email;
    let password = this.form.value.password;

    this.http

      .post("http://localhost:8443/auth/employeelogin/login", {
        userId,

        password,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.result == 2) {
          // location.replace("http://localhost:51245/layout/dashboard/employee");

          this.authenticationService.login(
            res.data.adminId,
            res.data.id,
            res.data.username,
            res.data.employeeId,
            res.data.email,
            res.data.firstName,
            res.data.lastName,
            res.data.phone,
            res.data.location
          );
        } else {
          alert("wrong Id or pass");
        }
      });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}

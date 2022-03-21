import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminAuthenticationService } from "src/app/core/storage/authentication-admin.service";
import { AuthenticationService } from "src/app/core/storage/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
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

  constructor(
    // private storage: WebStorage,
    private http: HttpClient,
    private router: Router,
    private adminAuthenticationService: AdminAuthenticationService
  ) {}

  ngOnInit() {}

  submit() {
    let userId = this.form.value.email;
    let password = this.form.value.password;
    console.log(this.form.valid);
    this.http
      .post("http://localhost:8443/auth/register/login", {
        userId,
        password,
      })
      .subscribe((res: any) => {
        console.log("result", res);
        this.adminAuthenticationService.login(
          res.companyEmail,
          res.username,
          res.id
        );
        if (res.result == 2) {
          this.router.navigate(["/layout/dashboard/admin"]);
          // location.replace("http://localhost:51245/layout/dashboard/admin");
        } else {
          alert("wrong Id or pass");
        }

        // location.replace("http://localhost:4200/layout/dashboard/admin");
      });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}

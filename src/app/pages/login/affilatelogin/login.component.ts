import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AffilateAuthenticationService } from "src/app/core/storage/authentication-affiliate.service";

@Component({
  selector: "app-affilatelogin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class AffiliateLoginComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    // private storage: WebStorage,
    private http: HttpClient,
    private router: Router,
    private affilateAuthenticationService: AffilateAuthenticationService
  ) { }

  ngOnInit() { }
  sendTo() {
    this.router.navigate(["/login/forgot"], {
      queryParams: {
        loginType: "affiliate",
      },
      skipLocationChange: true,
    });
  }
  submit() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    alert(username);
    this.http
      .post("http://localhost:8443/auth/affiliate/login", {
        username,
        password,
      })
      .subscribe((res: any) => {
        console.log("affiliates data", res);
        let affiliate = res.data;
        if (res.result == 2) {
          this.router.navigate(["/layout/affiliates/affiliatedashboard"]);
          // location.replace("http://localhost:51245/layout/dashboard/admin");
          this.affilateAuthenticationService.login(
            affiliate.id,
            affiliate.bankDetails,
            affiliate.email,
            affiliate.first_name,
            affiliate.last_name,
            affiliate.phone,
            affiliate.aId
          );
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

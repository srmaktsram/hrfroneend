import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MainAdminAuthenticationService } from "src/app/core/storage/authentication-mainadmin.service";
import { SubAdminAuthenticationService } from "src/app/core/storage/authentication-subadmin.service";

@Component({
  selector: "app-subadmin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class SubAdminLoginComponent implements OnInit {
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
    private subAdminAuthenticationService: SubAdminAuthenticationService
  ) { }

  ngOnInit() { }
  sendTo() {
    this.router.navigate(["/login/forgot"]);
  }
  submit() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    alert(username);
    this.http
      .post("http://localhost:8443/auth/subadminlogin/login", {
        username,
        password,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.result == 2) {
          this.router.navigate(["/layout/mainadmin/admindashboard"]);

          this.subAdminAuthenticationService.login();
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

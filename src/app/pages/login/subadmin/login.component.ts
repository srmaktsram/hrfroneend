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

          this.subAdminAuthenticationService.login(
            res.data.dashboard[0].read,
            res.data.dashboard[1].write,
            res.data.freeClients[0].read,
            res.data.freeClients[1].write,
            res.data.invoices[0].read,
            res.data.invoices[1].write,
            res.data.orders[0].read,
            res.data.orders[1].write,
            res.data.premiumClients[0].read,
            res.data.premiumClients[1].write,
            res.data.tickets[0].read,
            res.data.tickets[1].write,
            res.data.visitorClients[0].read,
            res.data.visitorClients[1].write
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

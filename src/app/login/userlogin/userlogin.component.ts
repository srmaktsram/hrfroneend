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

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
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
        this.authenticationService.login(
          res.companyEmail,
          res.username,
          res.id
        );
        if (res.result == 2) {
          // location.replace("http://localhost:51245/layout/dashboard/employee");
          this.router.navigate(["/layout/dashboard/employee"]);
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

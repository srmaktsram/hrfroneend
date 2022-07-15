import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RoleManagerAuthenticationService } from "src/app/core/storage/authentication-rolemanager.service";

@Component({
  selector: "app-rolemanager",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class RoleManagerComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private roleAdminAuthenticationService: RoleManagerAuthenticationService
  ) {}

  ngOnInit() {}
  sendTo() {
    this.router.navigate(["/login/forgot"], {
      queryParams: {
        loginType: "admin",
      },
      skipLocationChange: true,
    });
  }
  submit() {
    let email = this.form.value.email;
    let password = this.form.value.password;

    this.http
      .post("http://localhost:8443/auth/rolelogin/roleadmin", {
        email,
        password,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.result == 2) {
          this.router.navigate(["/layout/dashboard/admin"]);

          this.roleAdminAuthenticationService.login(
            "rolemanager",
            res.data.id,
            res.data.corporateId,
            res.data.companyEmail,
            res.data.companyName,
            res.data.companySite,
            res.data.pinCode,
            res.data.companyAddress,
            res.data.phone,
            res.data.mobile,
            res.data.location,
            res.data.cicon,
            res.data.cinvoice,
            res.data.cinvoicepre,
            res.data.packageName,
            res.role.users[0].read,
            res.role.users[1].write,
            res.role.Policies[0].read,
            res.role.Policies[1].write,
            res.role.supportTickets[0].read,
            res.role.supportTickets[1].write,
            res.role.clients[0].read,
            res.role.clients[1].write,
            res.role.Assets[0].read,
            res.role.Assets[1].write,
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

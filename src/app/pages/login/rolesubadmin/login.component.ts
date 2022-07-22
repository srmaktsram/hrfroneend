import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RoleSubAdminAuthenticationService } from "src/app/core/storage/authentication-rolesubadmin.service";

@Component({
  selector: "app-rolesubadmin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class RoleSubAdminComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

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
    private _snackBar: MatSnackBar,
    private roleAdminAuthenticationService: RoleSubAdminAuthenticationService
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
        this.http
          .get(
            "http://localhost:8443/mainadmin/packageAuth/getPackageAuthDetails" +
              "/" +
              res.data.packageName
          )
          .subscribe((response: any) => {
            if (res.result == 2) {
              this.router.navigate(["/layout"]);

              this.roleAdminAuthenticationService.login(
                "rolesubadmin",
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
                res.data.clogo,
                res.data.cinvoice,
                res.data.cinvoicepre,
                res.data.packageName,
                res.role.dashboard[0].read,
                res.role.dashboard[1].write,
                res.role.apps[0].read,
                res.role.apps[1].write,
                res.role.employee[0].read,
                res.role.employee[1].write,
                res.role.supportTickets[0].read,
                res.role.supportTickets[1].write,
                res.role.clients[0].read,
                res.role.clients[1].write,
                res.role.Projects[0].read,
                res.role.Projects[1].write,
                res.role.Leads[0].read,
                res.role.Leads[1].write,
                res.role.Tickets[0].read,
                res.role.Tickets[1].write,
                res.role.Sales[0].read,
                res.role.Sales[1].write,
                res.role.Accounting[0].read,
                res.role.Accounting[1].write,
                res.role.Payroll[0].read,
                res.role.Payroll[1].write,
                res.role.Policies[0].read,
                res.role.Policies[1].write,
                res.role.Reports[0].read,
                res.role.Reports[1].write,
                res.role.Performance[0].read,
                res.role.Performance[1].write,
                res.role.Goals[0].read,
                res.role.Goals[1].write,
                res.role.Training[0].read,
                res.role.Training[1].write,
                res.role.Promotions[0].read,
                res.role.Promotions[1].write,
                res.role.Resignation[0].read,
                res.role.Resignation[1].write,
                res.role.Termination[0].read,
                res.role.Termination[1].write,
                res.role.Assets[0].read,
                res.role.Assets[1].write,
                res.role.Jobs[0].read,
                res.role.Jobs[1].write,
                res.role.KnowledgeBase[0].read,
                res.role.KnowledgeBase[1].write,
                res.role.Activities[0].read,
                res.role.Activities[1].write,
                res.role.users[0].read,
                res.role.users[1].write,
                res.role.Settings[0].read,
                res.role.Settings[1].write,
                response
              );
              // console.log(res.role.apps[0].read,"apps Read")
              // console.log(res.role.apps[1].write,"apps Write")
            } else {
              this._snackBar.open(
                " No matching accounts have been found !",
                "",
                {
                  duration: 2000,
                  panelClass: "notif-success",

                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                }
              );
            }

            // location.replace("http://localhost:8443/layout/dashboard/admin");
          });
      });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}

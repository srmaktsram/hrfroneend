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
import { RoleHrAuthenticationService } from "src/app/core/storage/authentication-rolehr.service";

@Component({
  selector: "app-rolehr",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class RoleHrComponent implements OnInit {
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
    private roleAdminAuthenticationService: RoleHrAuthenticationService
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
              this.router.navigate(["/layout/dashboard/admin"]);

              this.roleAdminAuthenticationService.login(
                "rolehr",
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
                res.role.Jobs[0].read,
                res.role.Jobs[1].write,
                res.role.Policies[0].read,
                res.role.Policies[1].write,
                res.role.supportTickets[0].read,
                res.role.supportTickets[1].write,
                res.role.Training[0].read,
                res.role.Training[1].write,
                res.role.Performance[0].read,
                res.role.Performance[1].write,
                res.role.Payroll[0].read,
                res.role.Payroll[1].write,
                res.role.attendanceReport[0].read,
                res.role.attendanceReport[1].write,
                response
              );
              console.log(
                res.role.attendanceReport[0].read,
                "attendanceReport Read"
              );
              console.log(
                res.role.attendanceReport[1].write,
                "attendanceReport Write"
              );
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

            // location.replace("http://localhost:4200/layout/dashboard/admin");
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

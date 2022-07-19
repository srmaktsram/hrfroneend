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
import { RoleReceptionistAuthenticationService } from "src/app/core/storage/authentication-rolereceptionist.service";

@Component({
  selector: "app-rolesubadmin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class RoleReceptionistComponent implements OnInit {
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
    private roleAdminAuthenticationService: RoleReceptionistAuthenticationService
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
                "rolereceptionist",
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
                res.role.supportTickets[0].read,
                res.role.supportTickets[1].write,
                res.role.Policies[0].read,
                res.role.Policies[1].write,
                res.role.userDasboard[0].read,
                res.role.userDasboard[1].write,
                res.role.jobDashboard[0].read,
                res.role.jobDashboard[1].write,
                res.role.shortlistedCandidates[0].read,
                res.role.shortlistedCandidates[1].write,
                res.role.CandidatesList[0].read,
                res.role.CandidatesList[1].write,
                res.role.scheduleTiming[0].read,
                res.role.scheduleTiming[1].write,
                res.role.appliedCandidates[0].read,
                res.role.appliedCandidates[1].write,
                response
              );
              console.log(
                res.role.supportTickets[0].read,
                "supportTickets Read"
              );
              console.log(
                res.role.supportTickets[1].write,
                "supportTickets Write"
              );
              console.log(res.role.Policies[0].read, "Policies Read");
              console.log(res.role.Policies[1].write, "Policies Write");
              console.log(res.role.userDasboard[0].read, "userDasboard Read");
              console.log(res.role.userDasboard[1].write, "userDasboard Write");
              console.log(res.role.jobDashboard[0].read, "jobDashboard Read");
              console.log(res.role.jobDashboard[1].write, "jobDashboard Write");
              console.log(
                res.role.shortlistedCandidates[0].read,
                "shortlistedCandidates Read"
              );
              console.log(
                res.role.shortlistedCandidates[1].write,
                "shortlistedCandidates Write"
              );
              console.log(
                res.role.CandidatesList[0].read,
                "CandidatesList Read"
              );
              console.log(
                res.role.CandidatesList[1].write,
                "CandidatesList Write"
              );
              console.log(
                res.role.scheduleTiming[0].read,
                "scheduleTiming Read"
              );
              console.log(
                res.role.scheduleTiming[1].write,
                "scheduleTiming Write"
              );
              console.log(
                res.role.appliedCandidates[0].read,
                "appliedCandidates Read"
              );
              console.log(
                res.role.appliedCandidates[1].write,
                "appliedCandidates Write"
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

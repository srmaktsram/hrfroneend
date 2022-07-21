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
import { AuthenticationService } from "src/app/core/storage/authentication.service";

@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.css"],
})
export class UserLoginComponent implements OnInit {
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
  sendTo() {
    this.router.navigate(["/login/forgot"], {
      queryParams: {
        loginType: "employee",
      },
      skipLocationChange: true,
    });
  }
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
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
        console.log("employee Details>>>>>>>>>>>>>", res.data.adminId);
        this.http
          .get(
            "http://localhost:8443/admin/allEmployee/getPackageDetail" +
              "/" +
              res.data.adminId
          )
          .subscribe((response: any) => {
            if (res.result == 2) {
              // location.replace("http://localhost:51245/layout/dashboard/employee");
              this.router.navigate(["/layout/dashboard/employee"]);

              this.authenticationService.login(
                res.data.adminId,
                res.data.id,
                res.data.username,
                res.data.employeeId,
                res.data.email,
                res.data.firstName,
                res.data.lastName,
                res.data.phone,
                res.data.location,
                res.data.Leaves[0].read,
                res.data.Leaves[1].write,
                res.data.attendance[0].read,
                res.data.attendance[1].write,
                res.data.TimingSheets[0].read,
                res.data.TimingSheets[1].write,
                res.data.Clients[0].read,
                res.data.Clients[1].write,
                res.data.Projects[0].read,
                res.data.Projects[1].write,
                res.data.Holidays[0].read,
                res.data.Holidays[1].write,
                response,
                res.data.profileImage,
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
          });
      });
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}

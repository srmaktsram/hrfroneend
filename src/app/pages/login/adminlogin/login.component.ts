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
import { MainAdminAuthenticationService } from "src/app/core/storage/authentication-mainadmin.service";

@Component({
  selector: "app-adminlogin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class AdminLoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private adminAuthenticationService: MainAdminAuthenticationService
  ) {}

  ngOnInit() {}
  sendTo() {
    this.router.navigate(["/login/forgot"]);
  }
  submit() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    alert(username);
    this.http
      .post("http://localhost:8443/auth/mainadminlogin/login", {
        username,
        password,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.result == 2) {
          this.router.navigate(["/layout/mainadmin"]);
          this.adminAuthenticationService.login();
        } else {
          this._snackBar.open(" No matching accounts have been found !", "", {
            duration: 2000,
            panelClass: "notif-success",

            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}

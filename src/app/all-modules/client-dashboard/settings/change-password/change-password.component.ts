import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
  styles: [
    `
      ::ng-deep .mat-snack-bar-container {
        color: #155724 !important;
        background-color: #d4edda !important;
        border-color: #c3e6cb !important;
        align: center;
      }
      ::ng-deep .mat-simple-snackbar-action {
        color: red;
        align: center;
      }
    `,
  ],
})
export class ChangePasswordComponent implements OnInit {
  public changePassword: FormGroup;
  public id: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.id = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
  }

  submitChangePassword() {
    if (this.changePassword.valid) {
      let oldPassword = this.changePassword.value.oldPassword;
      let newPassword = this.changePassword.value.newPassword;
      this.http
        .patch(
          "http://localhost:8443/admin/psetting/updatePassword" + "/" + this.id,
          { oldPassword, newPassword }
        )
        .subscribe((res: any) => {
          console.log(res);
          this.reset();
          if (res.result == 1) {
            this._snackBar.open("Password Changed successfully!", "X", {
              duration: 1000,
              panelClass: "my-custom-snackbar",
            });
          }
        });
    }
  }
  reset() {
    this.changePassword.patchValue({
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    });
    this.changePassword.controls["oldPassword"].setErrors(null);
    this.changePassword.controls["newPassword"].setErrors(null);
    this.changePassword.controls["confirmPassword"].setErrors(null);
  }
}

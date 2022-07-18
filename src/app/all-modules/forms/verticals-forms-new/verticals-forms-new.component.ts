import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-verticals-forms-new",
  templateUrl: "./verticals-forms-new.component.html",
  styleUrls: ["./verticals-forms-new.component.css"],
})
export class VerticalsFormsNewComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  public basicForm: FormGroup;
  public addressForm: FormGroup;
  public twoColumnFormOne: FormGroup;
  public twoColumnFormTwo: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Basic Form Validation

    this.basicForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      repeatPassword: ["", [Validators.required]],
    });

    // Address Form Validation

    this.addressForm = this.formBuilder.group({
      addressOne: ["", [Validators.required]],
      addressTwo: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
    });

    // Vertical Form Validation

    this.twoColumnFormOne = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      bloodGroup: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      repeatPassword: ["", [Validators.required]],
      addresslineone: ["", [Validators.required]],
      addresslinetwo: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
    });

    // Vertical Form Validation

    this.twoColumnFormTwo = this.formBuilder.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required]],
      state: ["", [Validators.required]],
      textArea: ["", [Validators.required]],
      personalFirstName: ["", [Validators.required]],
      personalLastName: ["", [Validators.required]],
      personalEmail: ["", [Validators.required]],
      personalPhone: ["", [Validators.required]],
      personalCountry: ["", [Validators.required]],
      personalZipCode: ["", [Validators.required]],
      personalProvince: ["", [Validators.required]],
      personalCity: ["", [Validators.required]],
    });
  }

  basicFormSubmit() {
    if (this.basicForm.valid) {
      this._snackBar.open("BasicForm submitted sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  addressFormSubmit() {
    if (this.addressForm.valid) {
      this._snackBar.open("AddressForm submitted sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  columnOneSubmit() {
    if (this.twoColumnFormOne.valid) {
      this._snackBar.open("HorizontalForm submitted sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  columnTwoSubmit() {
    if (this.twoColumnFormTwo.valid) {
      this._snackBar.open("HorizontalForm submitted sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
